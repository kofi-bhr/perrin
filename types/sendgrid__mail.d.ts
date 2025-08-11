declare module '@sendgrid/mail' {
  interface MailDataRequired {
    to: string | string[]
    from: string
    subject: string
    html?: string
    text?: string
  }
  const mail: {
    setApiKey: (key: string) => void
    send: (data: MailDataRequired) => Promise<any>
  }
  export = mail
}


