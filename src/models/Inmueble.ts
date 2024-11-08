import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Locador from "./Locador";
import Contrato from "./Contrato";

@Table({
  tableName: 'inmueble',
  timestamps: true
})

class Inmueble extends Model {
  // Calle
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  calle!: string

  // Altura/Numero
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  altura?: string

  // Localidad
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  localidad!: string

  // Torre
  @Column({
    type: DataType.STRING(10),
    allowNull: true,  // Piso puede ser opcional en algunos inmuebles
  })
  torre?: string

  // Piso
  @Column({
    type: DataType.STRING(5),
    allowNull: true,  // Piso puede ser opcional en algunos inmuebles
  })
  piso?: string

  // Departamento
  @Column({
    type: DataType.STRING(5),
    allowNull: true,  // Departamento puede ser opcional
  })
  departamento?: string

  @ForeignKey(() => Locador)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  locadorId!: number

  // Relacion con Locador
  @BelongsTo(() => Locador)
  locador!: Locador

  // Relación con contratos
  @HasMany(() => Contrato)
  contratos!: Contrato[];
}

export default Inmueble;