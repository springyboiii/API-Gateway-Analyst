import pandas as pd
import numpy as np 

class Helper():
    def getDataFrameFromDict(dataDict):
        for key in dataDict:
            temp = [dataDict[key]]
            dataDict[key] = temp 
        
        # converted to key: [val] 

        pd.DataFrame.from_dict(dataDict)
    
    def getIndexOfMax(npArr):
        if (npArr is None): return None
        return np.argmax(npArr)
