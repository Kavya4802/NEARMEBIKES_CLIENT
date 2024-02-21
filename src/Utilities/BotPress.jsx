import React, { useEffect } from 'react'

const BotPress = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
                composerPlaceholder: "Chat with NearMe Bot",
                botConversationDescription: "This chatbot was built surprisingly fast with Botpress",
                botId: "76b52d49-8af4-45d5-901f-400859e42901",
                hostUrl: "https://cdn.botpress.cloud/webchat/v1",
                messagingUrl: "https://messaging.botpress.cloud",
                clientId: "76b52d49-8af4-45d5-901f-400859e42901",
                webhookId: "201ea68d-981f-4fe6-b1bd-df3a0fb2bf29",
                lazySocket: true,
                themeName: "prism",
                botName: "NearMe Bot",
                avatarUrl: "https://content.jdmagicbox.com/comp/visakhapatnam/j8/0891px891.x891.211208223032.r5j8/catalogue/near-me-bike-rentals-rtc-complex-visakhapatnam-amzizpzqcd.jpg?clr=",
                stylesheet: "https://webchat-styler-css.botpress.app/prod/876f5c44-f065-488e-a829-7d8338e69964/v83795/style.css",
                frontendVersion: "v1",
                useSessionStorage: true,
                enableConversationDeletion: true,
                theme: "prism",
                themeColor: "#2563eb"
            })
        }
    }, [])

    return <div id="webchat" />
}

export default BotPress;