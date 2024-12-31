import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Contrato from "./Contrato";

@Table({
  tableName: 'historial_contrato',
  timestamps: true
})

class HistorialContrato extends Model {
  // Importe actualizado
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  importe_actualizado!: number //Guarda el importe con el aumento

  //Fecha de la ultima actualizacion
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  fecha_actualizacion!: Date

  // Estado
  @Column({
    type: DataType.ENUM('vigente', 'finalizado'),
    allowNull: false
  })
  estado!: string

  // Contrato
  @ForeignKey(() => Contrato)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, 
  })
  id_contrato!: number;

  @BelongsTo(() => Contrato)
  contrato!: Contrato;
}

export default HistorialContrato;