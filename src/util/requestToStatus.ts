import { get } from 'config';
import { ICommonStorageConfig } from '../model/commonStorageConfig';
import { IExportData } from '../model/exportRequest';
import { IExportStatusData } from '../model/exportStatus';

export default function (exportData: IExportData): IExportStatusData {
  const config: ICommonStorageConfig = get('commonStorage');
  const currentDate = new Date(new Date().toUTCString());
  const expirationTime = new Date(currentDate);
  expirationTime.setDate(expirationTime.getDate() + config.expirationTime);
  const userId = 'tester'; // TODO: replace with request value
  return {
    taskId: exportData.taskId,
    userId: userId,
    fileURI: '',
    directoryName: exportData.directoryName,
    fileName: exportData.fileName,
    estimatedFileSize: exportData.sizeEst,
    realFileSize: 0,
    geometry: exportData.polygon,
    status: 'Pending',
    creationTime: currentDate,
    expirationTime: expirationTime,
    updatedTime: currentDate,
    progress: 0,
  };
}
