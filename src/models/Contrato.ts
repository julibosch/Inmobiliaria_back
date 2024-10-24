import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import Locatario from "./Locatario";
import Inmueble from "./Inmueble";

@Table({
  tableName: 'contrato'
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
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_inicio!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_fin!: Date;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  estado!: string;  // Ejemplos: "vigente", "finalizado", "proximo a vencer", "rescindido"

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
  monto!: number;

  @BelongsTo(() => Locatario)
  locatario!: Locatario;

  @BelongsTo(() => Inmueble)
  inmueble!: Inmueble;
}

export default Contrato;
