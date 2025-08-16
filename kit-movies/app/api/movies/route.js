import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const take = Number(searchParams.get('take')) || 5;

  let where = {};
  if (type) {
    where.type = type;
  }

  const movies = await prisma.movie.findMany({
    where,
    take,
  });
  return Response.json(movies);
}