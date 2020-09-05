/**
 * @author songxiwen
 * @date 2020/09/05 15:03
 */
/**
 * Data URLs
 * 格式----- data:[<mediatype>][;base64],<data>
 * data: 前缀
 * [<mediatype>] 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。
 * 如果被省略，则默认值为 text/plain;charset=US-ASCII
 * [;base64]
 * <data> 数据本身
 */

/**
 * data:image/gif;base64,R0lGODlhAQ....
 * @param dataUrl
 */

import { IImageUtil } from './image.util.interface';

export class ImageUtil implements IImageUtil {
  transformDataURLIntoBlob(dataUrl: string): Blob {
    // 分离data数据和Data URLs协议部分
    const byteString = atob(dataUrl.split(',')[1]);
    const type = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    // 创建一个ArrayBuffer
    const bin = new ArrayBuffer(byteString.length);
    // 创建空的Uint8Array，使用ArrayBuffer实例化
    const buffer = new Uint8Array(bin);
    // 将图像数据逐字节放入Uint8Array中
    for (let index = 0; index < byteString.length; index += 1) {
      buffer[index] = byteString.charCodeAt(index);
    }
    return new Blob([bin], { type });
  }

  async transformBlobIntoDataURL(blob: Blob): Promise<ArrayBuffer | string> {
    return new Promise((resolve, reject) => {
      // 使用reader读取图片
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        // DOMException
        reject(`Failed to read file or Blob!\n\n${reader.error}`);
        reader.abort();
      };
      // data:URL格式的Base64字符串
      reader.readAsDataURL(blob);
    });
  }

  transformDataURLIntoFile(dataUrl: any, fileName: any): File {
    const arr = dataUrl.split(',');
    const type = arr[0].match(/:(.*?);/)[1];
    const bin = atob(arr[1]);
    // 创建空的Uint8Array
    const buffer = new Uint8Array(bin.length);
    // 将图像数据逐字节放入Uint8Array中
    for (let index = 0; index < bin.length; index += 1) {
      buffer[index] = bin.charCodeAt(index);
    }
    // 利用Uint8Array创建Blob对象
    /**
     * new File(bits, )
     * @param {Array<ArrayBuffer|ArrayBufferView|Blob>} bits
     * @param name 文件名、文件路径
     * @param options 配置项
     */
    return new File([buffer.buffer], fileName, { type });
  }

  transformDataURLIntoImage(dataURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        resolve(image);
      };
      image.onerror = function (error) {
        reject(error);
      };
      image.src = dataURL;
    });
  }

  async compressPicture(pictureWidth: number, dataUrl: string): Promise<any> {
    const originalImageSize = await this.getImageSize(dataUrl);// 原始图片尺寸
    const { width } = originalImageSize;
    const { height } = originalImageSize;
    const originalImage = await this.transformDataURLIntoImage(dataUrl); // 获取当前图片对象
    const canvas = document.createElement('canvas');
    if (width > height) {
      const createHeight = Math.round(height * pictureWidth / width);
      canvas.width = pictureWidth;
      canvas.height = createHeight;
      // 上下距离
      const xWidth = Math.round((pictureWidth - createHeight) / 2);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(originalImage, 0, xWidth, pictureWidth, createHeight);
    } else if (width < height) {
      const createWidth = Math.round(width * pictureWidth / height);
      canvas.width = createWidth;
      canvas.height = pictureWidth;
      // 左右距离
      const yWidth = Math.round((pictureWidth - createWidth) / 2);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(originalImage, yWidth, 0, createWidth, 100);
    } else {
      canvas.width = pictureWidth;
      canvas.height = pictureWidth;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(originalImage, 0, 0, pictureWidth, pictureWidth);
    }
    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.9),
      size: {
        height: canvas.height,
        width: canvas.width,
      },
    };
  }

  getImageSize(dataURL: string): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // 图片加载后
      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      // 加载失败
      img.onerror = function (error) {
        reject(error);
      };
      // 图片路径
      img.src = dataURL;
    });
  }
}
