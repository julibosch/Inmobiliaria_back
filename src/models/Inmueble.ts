import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import Locador from "./Locador";

@Table({
  tableName: 'inmueble'
})

class Inmueble extends Model {
  // Calle
  @Column({
      type: DataType.STRING(50),
      allowNull: false,
  })
  calle!: string

  // Altura/Numero
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  altura!: string

  // Localidad
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  localidad!: string

  // Piso
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  piso!: string

  // Departamento
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  departamento!: string

  @ForeignKey(() => Locador)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  locadorId!: number

  // Relacion con Locador
  @BelongsTo(() => Locador)
  locador!: Locador
}

export default Inmueble;