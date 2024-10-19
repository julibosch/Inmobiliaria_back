import { Table, Column, Model, DataType, Default, AllowNull } from "sequelize-typescript";

@Table({
  tableName: 'locatario'
})

class Locatario extends Model {
  // Nombre
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nombre!: string

  // Apellido
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  apellido!: string

  // DNI
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  dni: string

  //Telefono
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  telefono: string
}

export default Locatario;