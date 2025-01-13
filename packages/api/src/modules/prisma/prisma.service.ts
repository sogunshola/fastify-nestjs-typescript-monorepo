import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { excludePasswordMiddleware } from '../../middleware/excludePassword.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * This method is called when the module is initialized.
   * It establishes a connection to the database using the Prisma client.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
   */
  async onModuleInit() {
    // this.$use(excludePasswordMiddleware());
    await this.$connect();
  }

  /**
   * This method is called when the module is being destroyed.
   * It ensures that the Prisma client disconnects properly.
   *
   * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
