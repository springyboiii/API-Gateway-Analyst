from datetime import datetime 

class ConversionHelper():
    def convertStrToDatetime(timeStr):
      # eg: 2018-01-06 18:54:00
      datetimeObj = datetime.strptime(timeStr, "%Y-%m-%d %H:%M:%S")
      return datetimeObj

    def prepareInputDictForPrediction(inputDict):
      pass