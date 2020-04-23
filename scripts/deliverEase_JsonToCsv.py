import sys
import os
import csv
import json


def extractDoubleLayerDictToCSV(data, fileName):
  allKeys = {"uuid"}
  for uuid in data.keys():
    allKeys = allKeys.union(set(data[uuid].keys()))

  allKeys = sorted(list(allKeys))

  data_file = open(fileName, 'w')
  csv_writer = csv.writer(data_file)
  csv_writer.writerow(allKeys) # header row

  for uuid in data.keys():
    volunteer = data[uuid]
    volunteer['uuid'] = uuid

    values = list()
    for key in allKeys:
      if key in volunteer:
        values.append(volunteer[key])
      else:
        values.append("")

    csv_writer.writerow(values)


  data_file.close()



def main():
  assert len(sys.argv) > 2, 'Please provide an input file as the first argument'

  inFile = sys.argv[1]
  assert inFile.endswith('.json'), 'Input file must be a .json'

  outFile = os.path.splitext(inFile)[0] + '.csv'
  if len(sys.argv) >= 3:
    assert outFile.endswith('.csv'), 'Output file must be .csv'
    outFile = sys.argv[2]

  with open(inFile) as json_file:
    data = json.load(json_file)

  for rootKey in data.keys():
    fileName = os.path.splitext(outFile)[0] + "_" + rootKey + '.csv'
    extractDoubleLayerDictToCSV(data[rootKey], fileName)


if __name__=="__main__":
  main()
