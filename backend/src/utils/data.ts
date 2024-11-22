import { BelongsToManyOptions, BelongsToOptions, DataType, DataTypes, HasManyOptions, HasOneOptions, Model, ModelStatic } from "sequelize";
import { EnumType } from "typescript";

export const defineId = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}

export const reference = (type: DataType, model: string, key: string) => ({ 
    type,
    references: { model, key }
})

export const referenceId = (model: string) => reference(DataTypes.INTEGER, model, "id");

type ModelArr = [ModelStatic<Model>, ...ModelStatic<Model>[]]
export const relationship = <T1 extends Model, T2 extends Model>(
    table:  ModelStatic<T1>,
    r1:     { h: "hasOne",        opt?: HasOneOptions  } |
            { h: "hasMany",       opt?: HasManyOptions },
    r2:     { others: ModelArr, b: "belongsTo",     opt?: BelongsToOptions     } |
            { others: ModelArr, b: "belongsToMany", opt : BelongsToManyOptions },
) => {
    r2.others.forEach(m => {
        table[r1.h](m, r1.opt);
        
        // @ts-expect-error
        // This throws a compile-time error even without ?
        // because the "through" property exists only in one,
        // Who cares. 
        m[r2.b](table, r2.opt);
    });
};

export const currDate = () => {
    const now = Date.now();
    return { createdAt: now, updatedAt: now };
};


export const enumStrVals = <T extends {[key: number]: string}>(e: T) =>
    ({ values: Object.values(e) })