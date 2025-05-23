const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();


exports.teamController = async function (req, res) {
    const {name, description, ownerid} = req.body;

    if (!ownerid || !name || !description) {
        return res.status(400).json({message:'Пожалуйста заполните все поля'})
    }
    try {
        const existingTeam = await prisma.team.findFirst({
            where: {
                OR: [
                    {name: name}
                ]
            }
        })

        if (existingTeam) {
            return res.status(400).json({message: 'Пожалуйста, выберите уникальное имя'})
        }
        const newTeam = await prisma.team.create({
            data: {
                name: name,
                description: description,
                ownerId: ownerid,
            },
            select: { 
                id: true,
                name: true,
                description: true,
                ownerId: true,
            }
        });
        res.status(201).json({ message: 'Команда успешно создана!', team: newTeam });


    } catch (error) {
        console.error('Ошибка при создании команды:', error)
    }
}


