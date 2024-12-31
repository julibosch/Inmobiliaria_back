import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull, HasMany } from "sequelize-typescript";
import Locatario from "./Locatario";
import Inmueble from "./Inmueble";
import { Estado } from "../types/ContratoTypes";
import TipoContrato from "./TipoContrato";
import HistorialContrato from "./HistorialContratos";

@Table({
  tableName: 'contrato',
  timestamps: true
})
class Contrato extends Model {
  @ForeignKey(() => Locatario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_locatario!: number;

  @ForeignKey(() => Inmueble)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_inmueble!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  fecha_inicio!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  fecha_fin!: Date;

  @Column({
    type: DataType.ENUM('vigente', 'finalizado', 'proximo_a_vencer', 'rescindido'),
    allowNull: false,
  })
  estado!: Estado; // Enum de ts creado en archivo types contrato

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 20, // Valor por defecto de 20 días
  })
  alerta_vencimiento!: number;  // Cantidad de días antes de la fecha de vencimiento para enviar una alerta

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  importe!: number;

  @ForeignKey(() => TipoContrato)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_tipo_contrato!: number;

  @BelongsTo(() => Locatario)
  locatario!: Locatario;

  @BelongsTo(() => Inmueble)
  inmueble!: Inmueble;

  @BelongsTo(() => TipoContrato)
  tipo_contrato!: TipoContrato;

  @HasMany(() => HistorialContrato)
  historial!: HistorialContrato[];
}

export default Contrato;
