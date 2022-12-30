import sys
import os 
from dotenv import load_dotenv
load_dotenv()

sys.path.append(os.getenv("SERVER_PATH"))


from controllers.auth import AuthController

def login(): 
    pass 
