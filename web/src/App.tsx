import { useState, useEffect, useCallback } from 'react'
import mqtt from 'mqtt'

export default function MQTTSubscriber() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [topic, setTopic] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    // MQTT WebSocket connection options
    const options = {
      protocol: 'ws',
      hostname: 'localhost',
      port: 9001,
      path: '/mqtt',
      username: 'mqtt_user',
      password: 'mqtt_password',
      clientId: `mqttjs_${Math.random().toString(16).substring(2, 8)}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    }

    // Create WebSocket URL
    const url = `ws://${options.hostname}:${options.port}${options.path}`
    console.log('Connecting to:', url)
    
    // Connect using WebSocket
    const mqttClient = mqtt.connect(url, options)

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker via WebSocket')
      setIsConnected(true)
      setClient(mqttClient)
    })

    mqttClient.on('error', (err) => {
      console.error('Connection error:', err)
      setIsConnected(false)
    })

    mqttClient.on('offline', () => {
      console.log('Client went offline')
      setIsConnected(false)
    })

    mqttClient.on('message', (topic, message) => {
      const messageString = message.toString()
      const timestamp = new Date().toLocaleTimeString()
      setMessages(prev => [...prev, `[${timestamp}] ${topic}: ${messageString}`])
    })

    return () => {
      if (mqttClient) {
        mqttClient.end()
      }
    }
  }, [])

  const handleSubscribe = useCallback(() => {
    if (client && topic) {
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to ${topic}`)
          setIsListening(true)
        } else {
          console.error('Subscribe error:', err)
        }
      })
    }
  }, [client, topic])

  const handleUnsubscribe = useCallback(() => {
    if (client && topic) {
      client.unsubscribe(topic, (err) => {
        if (!err) {
          console.log(`Unsubscribed from ${topic}`)
          setIsListening(false)
          setMessages([])
        } else {
          console.error('Unsubscribe error:', err)
        }
      })
    }
  }, [client, topic])

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">MQTT WebSocket Subscriber</h1>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter MQTT topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={!isConnected || isListening}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={isListening ? handleUnsubscribe : handleSubscribe}
            disabled={!isConnected || !topic}
            className={`px-4 py-2 rounded text-white ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:bg-gray-300`}
          >
            {isListening ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      <div className="border rounded p-4 h-80 overflow-auto bg-gray-50 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Subscribe to a topic to start receiving messages.
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
              {message}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        <span className="text-sm text-gray-600">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  )
}