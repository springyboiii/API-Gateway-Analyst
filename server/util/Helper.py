import pandas as pd
import numpy as np 

import os
from dotenv import load_dotenv
load_dotenv()

from tensorflow import keras

class Helper():

    def orderDict(dataDict):
        orderedDict = {}
        colsOrder = ['system_cpu_user_pct', 'system_cpu_system_pct',
       'system_cpu_idle_pct', 'system_cpu_iowait_pct',
       'system_cpu_softirq_pct', 'system_cpu_total_pct',
       'system_memory_used_pct', 'system_network_in_bytes',
       'system_network_in_packets', 'system_network_in_dropped',
       'system_network_out_bytes', 'system_network_out_packets',
       'system_network_out_errors',
       'jvm_metrics_memory_heap_memory_usage_committed',
       'jvm_metrics_memory_heap_memory_usage_max',
       'jvm_metrics_memory_heap_memory_usage_used',
       'jvm_metrics_threading_thread_count',
       'jvm_metrics_gc_psms_collection_count',
       'jvm_metrics_gc_psms_collection_time',
       'jvm_metrics_gc_pss_collection_count',
       'jvm_metrics_gc_pss_collection_time', 'system_diskio_iostat_await',
       'system_diskio_iostat_queue_avg_size',
       'system_diskio_iostat_read_per_sec_bytes',
       'system_diskio_iostat_write_per_sec_bytes']

        for col in colsOrder:
            orderedDict[col] = dataDict[col]
        
        return orderedDict

    def getDataFrameFromDict(dataDict):
        # converted to key: [val] 
        for key in dataDict:
            temp = [dataDict[key]]
            dataDict[key] = temp 
        


        return pd.DataFrame.from_dict(dataDict)
    
    def getIndexOfMax(npArr):
        if (npArr is None): return None
        return np.argmax(npArr)
    
    def loadModel():
        loadedModel = keras.models.load_model(os.getenv("SERVER_PATH")+"artifacts/ann_model.h5")
        return loadedModel

if __name__ == '__main__':
    # print(Helper.loadModel())

    temp = {
  "jvm_metrics_gc_psms_collection_count": [
    0.0
  ], 
  "jvm_metrics_gc_psms_collection_time": [
    0.0
  ], 
  "jvm_metrics_gc_pss_collection_count": [
    2.0
  ], 
  "jvm_metrics_gc_pss_collection_time": [
    62.0
  ], 
  "jvm_metrics_memory_heap_memory_usage_committed": [
    2060976128.0
  ], 
  "jvm_metrics_memory_heap_memory_usage_max": [
    2060976128.0
  ], 
  "jvm_metrics_memory_heap_memory_usage_used": [
    806926496.0
  ], 
  "jvm_metrics_threading_thread_count": [
    1046.0
  ], 
  "system_cpu_idle_pct": [
    3.666
  ], 
  "system_cpu_iowait_pct": [
    0.019
  ], 
  "system_cpu_softirq_pct": [
    0.008
  ], 
  "system_cpu_system_pct": [
    0.073
  ], 
  "system_cpu_total_pct": [
    0.3339999999999999
  ], 
  "system_cpu_user_pct": [
    0.2339999999999999
  ], 
  "system_diskio_iostat_await": [
    14.311
  ], 
  "system_diskio_iostat_queue_avg_size": [
    0.011
  ], 
  "system_diskio_iostat_read_per_sec_bytes": [
    0.0
  ], 
  "system_diskio_iostat_write_per_sec_bytes": [
    52197.0
  ], 
  "system_memory_used_pct": [
    0.9675
  ], 
  "system_network_in_bytes": [
    4000000.0
  ], 
  "system_network_in_dropped": [
    1.0
  ], 
  "system_network_in_packets": [
    6904.0
  ], 
  "system_network_out_bytes": [
    4000000.0
  ], 
  "system_network_out_errors": [
    6.0
  ], 
  "system_network_out_packets": [
    7535.0
  ]
}

    res = Helper.orderDict(temp)
    print(res)
    print("Done")