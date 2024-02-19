import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_when_project_share(to_email, project_name):
    sender_email = os.getenv("GMAIL_MAIL")
    sender_password = os.getenv("GMAIL_PWD")
    subject = "You join a new project"

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = to_email
    message['Subject'] = subject

    html_content = f"""
    <html>
        <body>
            <h2>Hello!</h2>
            <p>You have join a new project called {project_name}</p>
            <p>Now you can start working on it with your team members!</p>
        </body>
    </html>
    """
    message.attach(MIMEText(html_content, 'html'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
    except Exception as e:
        print('Error sending the email:', str(e))



