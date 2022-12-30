import sys 
import pytest
import os 
from dotenv import load_dotenv
load_dotenv()

sys.path.append(os.getenv("SERVER_PATH"))

from models.Feedback import Feedback, FeedbackSchema 

def testValidFeedback(): 
    """
    GIVEN - Feedback model
    WHEN - new feedback created
    THEN - check 
    """

    feedbackDetails = {
            "userId": "21234557", 
            "message": "UI can be developed",
        }

    result = FeedbackSchema().validate(feedbackDetails)
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
def testFeedbackTimestamp(timestamp, valid):
    """
    GIVEN - Feedback model
    WHEN - feedback created
    THEN - check 
    """
    feedbackDetails = {
            "timestamp": timestamp, 
            "message": "Anomaly detected",
        }

    result = FeedbackSchema().validate(feedbackDetails)
    
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
def testFeedbackMessage(message, valid):
    """
    GIVEN - Feedback model
    WHEN - feedback created
    THEN - check 
    """
    feedbackDetails = {
            "timestamp": "2022-12-28 18:14:42", 
            "message": message,
        }

    result = FeedbackSchema().validate(feedbackDetails)

    if valid == True:
        assert result == {}
    else:
        assert result["message"] is not None


