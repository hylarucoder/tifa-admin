import { Button, message, notification } from 'antd'
import React from 'react'

// Notify user if offline now
window.addEventListener('sw.offline', () => {
  message.warning({
    id: 'app.pwa.offline',
  })
})
window.addEventListener('sw.updated', (event: Event) => {
  const e = event as CustomEvent

  const reloadSW = async () => {
    // Check if there is sw whose state is waiting in ServiceWorkerRegistration
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
    const worker = e.detail && e.detail.waiting

    if (!worker) {
      return true
    } // Send skip-waiting event to waiting SW with MessageChannel

    await new Promise((resolve, reject) => {
      const channel = new MessageChannel()

      channel.port1.onmessage = (msgEvent) => {
        if (msgEvent.data.error) {
          reject(msgEvent.data.error)
        } else {
          resolve(msgEvent.data)
        }
      }

      worker.postMessage(
        {
          type: 'skip-waiting',
        },
        [channel.port2]
      )
    }) // Refresh current page to use the updated HTML and other assets after SW has skiped waiting

    window.location.reload(true)
    return true
  }

  const key = `open${Date.now()}`
  const btn = (
    <Button
      type="primary"
      onClick={() => {
        notification.close(key)
        reloadSW()
      }}
    >
      {{
        id: 'app.pwa.serviceworker.updated.ok',
      }}
    </Button>
  )
  notification.open({
    message: {
      id: 'app.pwa.serviceworker.updated',
    },
    description: {
      id: 'app.pwa.serviceworker.updated.hint',
    },
    btn,
    key,
    onClose: async () => null,
  })
})
