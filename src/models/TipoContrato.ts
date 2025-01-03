import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Contrato from "./Contrato";

@Table({
  tableName: 'tipo_contrato',
  timestamps: true
})

class TipoContrato extends Model {
  // Nombre
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duracion!: number //La duracion es en meses

  // Apellido
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  plazo_aumento!: number //Establece cada cuanto es el aumento de importes, ej: 4 meses, 2 meses

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  alarma_aumento!: number

  @HasMany(() => Contrato)
  contratos!: Contrato[];
}

export default TipoContrato;