export const removeFileExt = (fileNameOrPath: string) => {
	return fileNameOrPath.split('.').slice(0, -1).join('.');
};

export const getFileNameFromPath = (filePath: string) => {
	return filePath.replace(/^.*[\\\/]/, '');
};

export const getPathWithoutFileName = (filePath: string) => {
	return filePath.split('/').slice(0, -1).join('/');
};
