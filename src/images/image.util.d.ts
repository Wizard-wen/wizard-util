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
export declare class ImageUtil implements IImageUtil {
    transformDataURLIntoBlob(dataUrl: string): Blob;
    transformBlobIntoDataURL(blob: Blob): Promise<ArrayBuffer | string>;
    transformDataURLIntoFile(dataUrl: any, fileName: any): File;
    transformDataURLIntoImage(dataURL: string): Promise<HTMLImageElement>;
    compressPicture(pictureWidth: number, dataUrl: string): Promise<any>;
    getImageSize(dataURL: string): Promise<{
        width: number;
        height: number;
    }>;
}
