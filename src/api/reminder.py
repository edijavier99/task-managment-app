import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def sendTaskReminder(to_email, subject, task_titles):
    sender_email = os.getenv("GMAIL_MAIL")
    sender_pwd = os.getenv("GMAIL_PWD")

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = to_email
    message['Subject'] = subject

    body = f'Esto es un recordatorio para las tareas que tienes previstas para mañana:\n\n'
    body += ''.join(task_titles)

    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_pwd)
        text = message.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
    except Exception as e:
        print('Error sending reminder to the email:', str(e))