/**
 * @author songxiwen
 * @date 2020/09/05 15:05
 */

export interface IImageUtil {
  transformDataURLIntoBlob(dataUrl: string): Blob;
  transformDataURLIntoFile(dataUrl: any, fileName: any): File;
  transformBlobIntoDataURL(blob: Blob): any;
  transformDataURLIntoImage(dataURL: string): any;
  getImageSize(dataURL: string): any;
  compressPicture(pictureWidth: number, dataUrl: string): any;
}
