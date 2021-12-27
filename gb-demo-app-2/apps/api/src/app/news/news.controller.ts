import { Body, Controller, Get, Header, Post } from '@nestjs/common';

@Controller('news')
export class NewsController {
  @Get()
  async getNews() {
    return new Promise(resolve => {
      const news = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now()
        }))

      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve(peaceOfNews);
      }, 100)
    });
  }
}
