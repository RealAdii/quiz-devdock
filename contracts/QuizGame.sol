// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './QuizToken.sol';

contract QuizGame {
    struct Question {
        string question;
        string[] options;
        uint8 correctAnswer;
        uint256 endTime;
        bool revealed;
    }

    struct Player {
        uint256 score;
        uint256 tokens;
    }

    QuizToken public quizToken;
    mapping(uint256 => Question) public questions;
    mapping(address => Player) public players;
    mapping(uint256 => mapping(address => bool)) public hasAnswered;
    
    uint256 public currentQuestionId;
    uint256 public constant REWARD_AMOUNT = 10 * 10**18; // 10 tokens
    uint256 public constant ROUND_DURATION = 30 seconds;

    event QuestionAdded(uint256 questionId, string question);
    event AnswerSubmitted(address player, uint256 questionId);
    event RewardDistributed(address player, uint256 amount);

    constructor(address _tokenAddress) {
        quizToken = QuizToken(_tokenAddress);
    }

    function addQuestion(
        string memory _question,
        string[] memory _options,
        uint8 _correctAnswer
    ) external {
        require(_options.length >= 2, 'Minimum 2 options required');
        require(_correctAnswer < _options.length, 'Invalid correct answer index');

        currentQuestionId++;
        questions[currentQuestionId] = Question({
            question: _question,
            options: _options,
            correctAnswer: _correctAnswer,
            endTime: block.timestamp + ROUND_DURATION,
            revealed: false
        });

        emit QuestionAdded(currentQuestionId, _question);
    }

    function submitAnswer(uint256 _questionId, uint8 _answer) external {
        Question storage question = questions[_questionId];
        require(block.timestamp < question.endTime, 'Question time ended');
        require(!hasAnswered[_questionId][msg.sender], 'Already answered');
        require(_answer < question.options.length, 'Invalid answer index');

        hasAnswered[_questionId][msg.sender] = true;
        
        if (_answer == question.correctAnswer) {
            players[msg.sender].score += 1;
            quizToken.transfer(msg.sender, REWARD_AMOUNT);
            players[msg.sender].tokens += REWARD_AMOUNT;
            emit RewardDistributed(msg.sender, REWARD_AMOUNT);
        }

        emit AnswerSubmitted(msg.sender, _questionId);
    }

    function getCurrentQuestion() external view returns (
        string memory question,
        string[] memory options,
        uint256 endTime,
        bool revealed
    ) {
        Question storage q = questions[currentQuestionId];
        return (q.question, q.options, q.endTime, q.revealed);
    }

    function getPlayerStats(address _player) external view returns (
        uint256 score,
        uint256 tokens
    ) {
        Player storage player = players[_player];
        return (player.score, player.tokens);
    }
}