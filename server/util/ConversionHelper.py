from datetime import datetime 

class ConversionHelper():
    def convertStrToDatetime(timeStr):
      # eg: 2018-01-06 18:54:00
      datetimeObj = datetime.strptime(timeStr, "%Y-%m-%d %H:%M:%S")
      return datetimeObj

    def prepareInputDictForPrediction(inputDict):
      pass
  
    def getTypeOfScenario(scenario):
      mapping = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 4,
        10: 6
      }
      return mapping[scenario] 