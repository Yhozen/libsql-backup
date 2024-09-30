import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/config/configuration';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService<ConfigSchema, true>,
  ) {
    const client = createClient({
      url: 'file:./db-file.db',
      authToken: configService.get('TURSO_AUTH_TOKEN'),
      syncUrl: configService.get('TURSO_SYNC_URL'),
      syncInterval: 60,
    });
    const adapter = new PrismaLibSQL(client);

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
