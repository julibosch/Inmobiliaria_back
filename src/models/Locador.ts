import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: 'locador'
})

class Locador extends Model {
  
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })

  nombre!: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })

  apellido!: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })

  dni: string

  @Column({
    type: DataType.STRING(50)
  })

  telefono: string
}

export default Locador;