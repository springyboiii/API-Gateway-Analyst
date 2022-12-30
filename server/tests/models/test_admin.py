import sys 
import pytest
sys.path.append("/home/chathuwa/Desktop/api-gateway-analyst/API-Gateway-Analyst/server")

from models.Admin import Admin, AdminSchema 

def testValidAdmin(): 
    """
    GIVEN - Admin model
    WHEN - new admin created
    THEN - check 
    """

    adminDetails = {
            "name": "Chathuranga", 
            "email": "chathuranga@gmail.com",
            "password": "1234",
        }

    result = AdminSchema().validate(adminDetails)
    print(result)
    assert result == {}

@pytest.mark.parametrize(
    "password,valid",
    [
        ("Abcd", True),
        ("12", False),
        ("", False)
    ]
)
def testAdminPassword(password, valid):
    """
    GIVEN - Admin model
    WHEN - admin created
    THEN - check 
    """
    adminDetails = {
            "name": "Chathuranga", 
            "email": "chathuranga@gmail.com",
            "password": password,
        }

    try:
        AdminSchema().validate(adminDetails)
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
def testAdminEmail(email, valid):
    """
    GIVEN - Admin model
    WHEN - admin created
    THEN - check 
    """
    adminDetails = {
            "name": "Chathuranga", 
            "email": email,
            "password": "1234",
        }

    try:
        AdminSchema().validate(adminDetails)
        assert valid 
    except Exception: 
        assert not valid


