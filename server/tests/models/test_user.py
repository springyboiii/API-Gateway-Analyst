import sys 
import pytest
import os 
from dotenv import load_dotenv
load_dotenv()

sys.path.append(os.getenv("SERVER_PATH"))

from models.User import User, UserSchema 

def testValidUser(): 
    """
    GIVEN - User model
    WHEN - new user created
    THEN - check 
    """

    userDetails = {
            "name": "Chathuranga", 
            "email": "chathuranga@gmail.com",
            "password": "1234",
        }

    result = UserSchema().validate(userDetails)
    assert result == {}

@pytest.mark.parametrize(
    "password,valid",
    [
        ("Abcd", True),
        ("12", False),
        ("", False)
    ]
)
def testUserPassword(password, valid):
    """
    GIVEN - User model
    WHEN - user created
    THEN - check 
    """
    userDetails = {
            "name": "Chathuranga", 
            "email": "chathuranga@gmail.com",
            "password": password,
        }

    try:
        UserSchema().validate(userDetails)
        assert valid 
    except Exception: 
        assert not valid

@pytest.mark.parametrize(
    "email,valid",
    [
        ("Abcd", False),
        ("abc@gmail.com", True),
        ("abc@yahoo.com", True),
        ("abc@gmailcom", False),
        ("", False)
    ]
)
def testUserEmail(email, valid):
    """
    GIVEN - User model
    WHEN - user created
    THEN - check 
    """
    userDetails = {
            "name": "Chathuranga", 
            "email": email,
            "password": "1234",
        }

    try:
        UserSchema().validate(userDetails)
        assert valid 
    except Exception: 
        assert not valid


