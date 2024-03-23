import {Controller, Post, HttpCode, Body, ConflictException} from '@nestjs/common'
import {PrismaService} from '../../services/prismaService'
import {z} from 'zod'
import {hash} from 'bcryptjs'

const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    phone: z.string(),
    password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const PASSWORD_ENCRYPTION_SALT_LEVEL = 6

@Controller("/users")
export class CreateUserController{
    constructor(private prisma : PrismaService){}
    @Post()
    @HttpCode(201)
    async handle(@Body() body : CreateUserBodySchema){
        const {name, email, cpf, phone, password} = createUserBodySchema.parse(body)

        if(!name || !email || !cpf || !phone || !password){
            throw new ConflictException("'name', 'email', 'password', 'cpf', and 'phone' are required fields")
        }

        const userEmailAlreadyExists = await this.prisma.user.findUnique({
            where:{
                email
            }
        })

        const userCpfAlreadyExists = await this.prisma.user.findUnique({
            where:{
                cpf
            }
        })

        if(userEmailAlreadyExists || userCpfAlreadyExists){
            throw new ConflictException("An user with the same email or cpf provided already exists")
        }

        const encryptedPassword = await hash(password, PASSWORD_ENCRYPTION_SALT_LEVEL)

        await this.prisma.user.create({
            data:{
                name,
                email,
                cpf,
                phone,
                password: encryptedPassword
            }
        })
    }
}
