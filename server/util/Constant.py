class Constant:
    def getRoles():
        roles = {
            "admin": "ADMIN",
            "user": "USER"
        }
        return roles
    
    def getAnomalyTypes(): 
        anomalyTypes = {
            0: "Not an anomaly",
            1: "Anomaly detected",
        }
        return anomalyTypes