import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Default,
  Unique,
  AllowNull,
} from "sequelize-typescript";
import Budget from "./budget";

@Table({
  tableName: "users",
})
class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Unique(true)
  @Column({
    type: DataType.STRING(6),
  })
  declare token: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare confirmed: string;

  @HasMany(() => Budget, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  declare budget: Budget[];
}

export default User;
