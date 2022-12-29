import sys 
import pytest
import os 
from dotenv import load_dotenv
load_dotenv()

sys.path.append(os.getenv("SERVER_PATH"))

from models.Notification import Notification, NotificationSchema 

def testValidNotification(): 
    """
    GIVEN - Notification model
    WHEN - new notification created
    THEN - check 
    """

    notificationDetails = {
            "timestamp": "2022-12-28 18:14:42", 
            "message": "Anomaly detected",
        }

    result = NotificationSchema().validate(notificationDetails)
    assert result == {}

@pytest.mark.parametrize(
    "timestamp,valid",
    [
        ("Abcdd", False),
        ("12", False),
        ("", False),
        ("2022-12-28 18:14:42", True)
    ]
)
def testNotificationTimestamp(timestamp, valid):
    """
    GIVEN - Notification model
    WHEN - notification created
    THEN - check 
    """
    notificationDetails = {
            "timestamp": timestamp, 
            "message": "Anomaly detected",
        }

    result = NotificationSchema().validate(notificationDetails)
    
    if valid == True:
        assert result == {}
    else:
        assert result["timestamp"] is not None

@pytest.mark.parametrize(
    "message,valid",
    [
        ("Anomaly detcted", True),
        ("", False),
    ]
)
def testNotificationMessage(message, valid):
    """
    GIVEN - Notification model
    WHEN - notification created
    THEN - check 
    """
    notificationDetails = {
            "timestamp": "2022-12-28 18:14:42", 
            "message": message,
        }

    result = NotificationSchema().validate(notificationDetails)

    if valid == True:
        assert result == {}
    else:
        assert result["message"] is not None


