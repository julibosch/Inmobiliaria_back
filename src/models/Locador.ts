import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Inmueble from "./Inmueble";

@Table({
  tableName: 'locador'
})

class Locador extends Model {
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

  // Relacion con Inmueble
  @HasMany(() => Inmueble)
  inmuebles: Inmueble[]
}

export default Locador;