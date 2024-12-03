import * as React from 'react'
import { Connector, useConnect, useAccount, useDisconnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()


  // Filter to show only MetaMask
  const metaMaskConnector = connectors.find(connector => connector.name === 'MetaMask')

  return metaMaskConnector ? (
    <WalletOption
      key={metaMaskConnector.uid}
      connector={metaMaskConnector}
      onClick={() => connect({ connector: metaMaskConnector })}
    />
  ) : null
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}

export function ConnectWallet() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { isConnected, address } = useAccount()
  return (
    <div>
      <button 
        style={{ 
          padding: '12px 24px', 
          fontSize: '18px', 
          cursor: 'pointer', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px',
          transition: 'background-color 0.3s'
        }} 
        onClick={() => setIsOpen(true)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        {isConnected ? address?.slice(0, 6) + '...' + address?.slice(-4) : 'Connect Wallet'}
      </button>
      
      {isOpen && (
        <div className="wallet-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="wallet-modal-content" style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            width: '350px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '25px', fontSize: '24px' }}>Connect Wallet</h2>
            <WalletOptions />
            <button 
              style={{ 
                marginTop: '25px', 
                padding: '12px 24px', 
                cursor: 'pointer', 
                backgroundColor: '#dc3545', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }} 
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}