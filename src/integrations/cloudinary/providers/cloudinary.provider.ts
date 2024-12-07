import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigModuleEnum } from 'src/constants/enums';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: async (configService: ConfigService) => {
    const cloudinaryConfig = configService.get(ConfigModuleEnum.Cloudinary);
    cloudinary.config({
      cloud_name: cloudinaryConfig.name,
      api_key: cloudinaryConfig.key,
      api_secret: cloudinaryConfig.secret,
    });

    try {
      await cloudinary.api.ping();
      console.log('Cloudinary connected successfully!');
    } catch (error) {
      console.error('Cloudinary connection failed:', error.message);
      throw new Error('Unable to connect to Cloudinary. Please check your configuration.');
    }

    return cloudinary;
  },
  inject: [ConfigService],
};
