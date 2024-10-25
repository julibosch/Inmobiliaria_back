import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'locatario'
})

class Locatario extends Model {
  // Nombre
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  nombre!: string

  // Apellido
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  apellido!: string

  // DNI
  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  dni: string

  //Telefono
  @Column({
    type: DataType.STRING(20)
  })
  telefono: string
}

export default Locatario;