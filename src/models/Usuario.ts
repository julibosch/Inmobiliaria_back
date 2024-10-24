import { Table, Column, Model, DataType, Default, AllowNull } from "sequelize-typescript";

@Table({
  tableName: 'usuario'
})

class Usuario extends Model {
  // Nombre
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nombre: string

  // Apellido
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  password: string
}

export default Usuario;