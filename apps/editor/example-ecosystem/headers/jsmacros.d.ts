type ClassLike = {
  class: Packages.java.lang.Class<any>;
  [Symbol.hasInstance](v): boolean
 }
type isAny<T> = (T extends never ? true : false) extends false ? false : true;
type CombineTypes<A> = (
  A extends [infer B, ...infer Rest] ?
    isAny<B> extends true ?
      CombineTypes<Rest>
      : CombineTypes<Rest> extends never ? B : B & CombineTypes<Rest>
    : A extends [infer B] ?
      isAny<B> extends true ? never : B
  : never
)
type char   = number & {};
type byte   = number & {};
type short  = number & {};
type int    = number & {};
type long   = number | BigInt;
type float  = number & {};
type double = number & {};
type Function$$JS = Function;
declare module Packages {
  module architectury_inject_jsmacros_common_189a663211194e03a29a59f4a40828d5_825f63c136604727c187fed1e45d0a61abbea1b2b5d8c93fde6c643d61173d94common200devjar {
    interface _PlatformMethods$$static extends ClassLike {
      getCurrentTarget(): string;
    }
    let PlatformMethods: _PlatformMethods$$static;
    interface _PlatformMethods {
    }
    interface PlatformMethods extends CombineTypes<[_PlatformMethods, java.lang.Object]> {}
  }
  module io {
    module noties {
      module prism4j {
        module languages {
          interface _Prism_clike$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
          }
          let Prism_clike: _Prism_clike$$static;
          interface _Prism_clike {
          }
          interface Prism_clike extends CombineTypes<[_Prism_clike, java.lang.Object]> {}
          interface _Prism_groovy$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_groovy;
          }
          let Prism_groovy: _Prism_groovy$$static;
          interface _Prism_groovy {
          }
          interface Prism_groovy extends CombineTypes<[_Prism_groovy, java.lang.Object]> {}
          interface _Prism_javascript$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_javascript;
          }
          let Prism_javascript: _Prism_javascript$$static;
          interface _Prism_javascript {
          }
          interface Prism_javascript extends CombineTypes<[_Prism_javascript, java.lang.Object]> {}
          interface _Prism_json$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_json;
          }
          let Prism_json: _Prism_json$$static;
          interface _Prism_json {
          }
          interface Prism_json extends CombineTypes<[_Prism_json, java.lang.Object]> {}
          interface _Prism_kotlin$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_kotlin;
          }
          let Prism_kotlin: _Prism_kotlin$$static;
          interface _Prism_kotlin {
          }
          interface Prism_kotlin extends CombineTypes<[_Prism_kotlin, java.lang.Object]> {}
          interface _Prism_lua$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_lua;
          }
          let Prism_lua: _Prism_lua$$static;
          interface _Prism_lua {
          }
          interface Prism_lua extends CombineTypes<[_Prism_lua, java.lang.Object]> {}
          interface _Prism_python$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_python;
          }
          let Prism_python: _Prism_python$$static;
          interface _Prism_python {
          }
          interface Prism_python extends CombineTypes<[_Prism_python, java.lang.Object]> {}
          interface _Prism_regex$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_regex;
          }
          let Prism_regex: _Prism_regex$$static;
          interface _Prism_regex {
          }
          interface Prism_regex extends CombineTypes<[_Prism_regex, java.lang.Object]> {}
          interface _Prism_ruby$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_ruby;
          }
          let Prism_ruby: _Prism_ruby$$static;
          interface _Prism_ruby {
          }
          interface Prism_ruby extends CombineTypes<[_Prism_ruby, java.lang.Object]> {}
          interface _Prism_typescript$$static extends ClassLike {
            create(prism4j: Prism4j): Prism4j$Grammar;
            new(): Prism_typescript;
          }
          let Prism_typescript: _Prism_typescript$$static;
          interface _Prism_typescript {
          }
          interface Prism_typescript extends CombineTypes<[_Prism_typescript, java.lang.Object]> {}
        }
      }
    }
  }
  module xyz {
    module wagyourtail {
      module doclet {
        interface _DocletDeclareType$$static extends ClassLike {
        }
        let DocletDeclareType: _DocletDeclareType$$static;
        interface _DocletDeclareType {
          name(): string;
          type(): string;
        }
        interface DocletDeclareType extends CombineTypes<[_DocletDeclareType, java.lang.annotation.Annotation, java.lang.Object]> {}
        interface _DocletIgnore$$static extends ClassLike {
        }
        let DocletIgnore: _DocletIgnore$$static;
        interface _DocletIgnore {
        }
        interface DocletIgnore extends CombineTypes<[_DocletIgnore, java.lang.annotation.Annotation, java.lang.Object]> {}
        interface _DocletReplaceParams$$static extends ClassLike {
        }
        let DocletReplaceParams: _DocletReplaceParams$$static;
        interface _DocletReplaceParams {
          value(): string;
(): string;
        }
        interface DocletReplaceParams extends CombineTypes<[_DocletReplaceParams, java.lang.annotation.Annotation, java.lang.Object]> {}
        interface _DocletReplaceReturn$$static extends ClassLike {
        }
        let DocletReplaceReturn: _DocletReplaceReturn$$static;
        interface _DocletReplaceReturn {
          value(): string;
(): string;
        }
        interface DocletReplaceReturn extends CombineTypes<[_DocletReplaceReturn, java.lang.annotation.Annotation, java.lang.Object]> {}
        interface _DocletReplaceTypeParams$$static extends ClassLike {
        }
        let DocletReplaceTypeParams: _DocletReplaceTypeParams$$static;
        interface _DocletReplaceTypeParams {
          value(): string;
(): string;
        }
        interface DocletReplaceTypeParams extends CombineTypes<[_DocletReplaceTypeParams, java.lang.annotation.Annotation, java.lang.Object]> {}
      }
      module jsmacros {
        module access {
          interface _CustomClickEvent$$static extends ClassLike {
            new(event: java.lang.Runnable): CustomClickEvent;
          }
          let CustomClickEvent: _CustomClickEvent$$static;
          interface _CustomClickEvent {
            getActionType(): string;
            getEvent(): java.lang.Runnable;
            hashCode(): int;
            toPlatformClickEvent(): any;
            _event: java.lang.Runnable;
          }
          interface CustomClickEvent extends CombineTypes<[_CustomClickEvent, xyz.wagyourtail.jsmacros.access.ICustomClickEvent, java.lang.Object]> {}
          interface _ICustomClickEvent$$static extends ClassLike {
          }
          let ICustomClickEvent: _ICustomClickEvent$$static;
          interface _ICustomClickEvent {
            getActionType(): string;
            getEvent(): java.lang.Runnable;
            toPlatformClickEvent(): any;
          }
          interface ICustomClickEvent extends CombineTypes<[_ICustomClickEvent, java.lang.Object]> {}
        }
        module api {
          module coordinate {
            interface _ICoordinateConverter$$static extends ClassLike {
            }
            let ICoordinateConverter: _ICoordinateConverter$$static;
            interface _ICoordinateConverter {
              convertFromBlockPos(a0: any): api.math.Pos3D;
              convertFromVec3d(a0: any): api.math.Pos3D;
              convertToBlockPos(a0: api.math.Pos3D): any;
              convertToVec3d(a0: api.math.Pos3D): any;
              createBlockPos(a0: double, a1: double, a2: double): any;
              createVec3d(a0: double, a1: double, a2: double): any;
            }
            interface ICoordinateConverter extends CombineTypes<[_ICoordinateConverter, java.lang.Object]> {}
          }
          module helper {
            interface _ModContainerHelper$$static<T> extends ClassLike {
              _new(base: T): ModContainerHelper<T>;
            }
            let ModContainerHelper: _ModContainerHelper$$static<T>;
            interface _ModContainerHelper<T> {
              getAuthors(): java.util.List<string>;
              getDependencies(): java.util.List<string>;
              getDescription(): string;
              getEnv(): string;
              getId(): string;
              getName(): string;
              getVersion(): string;
              toString(): string;
            }
            interface ModContainerHelper<T> extends CombineTypes<[_ModContainerHelper<T>, jsmacros.core.helpers.BaseHelper<T>]> {}
          }
          module library {
            interface _FJavaUtils$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): FJavaUtils;
            }
            let FJavaUtils: _FJavaUtils$$static;
            interface _FJavaUtils {
              arrayDeepToString(array: any[]): string;
              arrayToString(array: any[]): string;
              createArrayList(): java.util.ArrayList<any>;
              createArrayList<T>(array: T[]): java.util.ArrayList<T>;
              createHashMap(): java.util.HashMap<any,any>;
              createHashSet(): java.util.HashSet<any>;
              getHelperFromRaw(raw: any): any;
              getRandom(): java.util.SplittableRandom;
              getRandom(seed: long): java.util.SplittableRandom;
            }
            interface FJavaUtils extends CombineTypes<[_FJavaUtils, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
            interface _FUtils$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): FUtils;
            }
            let FUtils: _FUtils$$static;
            interface _FUtils {
              decode(message: string): string;
              encode(message: string): string;
              guessName(text: string): string;
              guessNameAndRoles(text: string): java.util.List<string>;
              hashString(message: string): string;
              hashString(message: string, algorithm: string): string;
              hashString(message: string, algorithm: string, base64: boolean): string;
              requireNonNull<T>(obj: T): T;
              requireNonNull<T>(obj: T, message: string): T;
            }
            interface FUtils extends CombineTypes<[_FUtils, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
          }
          module math {
            interface _IMathHelper$$static extends ClassLike {
            }
            let IMathHelper: _IMathHelper$$static;
            interface _IMathHelper {
              degToRad(degrees: float): float;
              normalizeAngle(angle: float): float;
              radToDeg(radians: float): float;
              wrapDegrees(a0: float): float;
(a0: float): float;
            }
            interface IMathHelper extends CombineTypes<[_IMathHelper, java.lang.Object]> {}
            interface _Plane3D$$static extends ClassLike {
              new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: double, a7: double, y2: double): Plane3D;
            }
            let Plane3D: _Plane3D$$static;
            interface _Plane3D {
              equals(o: any): boolean;
              getNormalVector(): Vec3D;
              getVec12(): Vec3D;
              getVec13(): Vec3D;
              getVec23(): Vec3D;
              hashCode(): int;
              x1: double;
              x2: double;
              x3: double;
              y1: double;
              y2: double;
              y3: double;
              z1: double;
              z2: double;
              z3: double;
            }
            interface Plane3D extends CombineTypes<[_Plane3D, java.lang.Object]> {}
            interface _Pos2D$$static extends ClassLike {
              readonly ZERO: Pos2D;
              new(x: double, a1: double): Pos2D;
            }
            let Pos2D: _Pos2D$$static;
            interface _Pos2D {
              add(pos: Pos2D): Pos2D;
              add(x: double, a1: double): Pos2D;
              compareTo(o: Pos2D): int;
              divide(pos: Pos2D): Pos2D;
              divide(x: double, a1: double): Pos2D;
              equals(o: any): boolean;
              getX(): double;
              getY(): double;
              hashCode(): int;
              multiply(pos: Pos2D): Pos2D;
              multiply(x: double, a1: double): Pos2D;
              scale(scale: double): Pos2D;
              sub(pos: Pos2D): Pos2D;
              sub(x: double, a1: double): Pos2D;
              to3D(): Pos3D;
              toReverseVector(): Vec2D;
              toReverseVector(end_pos: Pos2D): Vec2D;
              toReverseVector(end_x: double, a1: double): Vec2D;
              toString(): string;
              toVector(): Vec2D;
              toVector(start_pos: Pos2D): Vec2D;
              toVector(start_x: double, a1: double): Vec2D;
              x: double;
              y: double;
            }
            interface Pos2D extends CombineTypes<[_Pos2D, java.lang.Object]> {}
            interface _Pos3D$$static extends ClassLike {
              fromVec3d(vec3d: any, converter: api.coordinate.ICoordinateConverter): Pos3D;
              readonly ZERO: Pos3D;
              new(x: double, a1: double, y: double): Pos3D;
            }
            let Pos3D: _Pos3D$$static;
            interface _Pos3D {
              add(pos: Pos3D): Pos3D;
              add(x: double, a1: double, y: double): Pos3D;
              compareTo(o: Pos3D): int;
              divide(pos: Pos3D): Pos3D;
              divide(x: double, a1: double, y: double): Pos3D;
              equals(o: any): boolean;
              getZ(): double;
              hashCode(): int;
              multiply(pos: Pos3D): Pos3D;
              multiply(x: double, a1: double, y: double): Pos3D;
              scale(scale: double): Pos3D;
              scale(a0: double): Pos2D;
              sub(pos: Pos3D): Pos3D;
              sub(x: double, a1: double, y: double): Pos3D;
              toMojangDoubleVector(converter: api.coordinate.ICoordinateConverter): any;
              toMojangDoubleVector(): any;
              toRawBlockPos(converter: api.coordinate.ICoordinateConverter): any;
              toRawBlockPos(): any;
              toReverseVector(): Vec3D;
              toReverseVector(end_pos: Pos2D): Vec3D;
              toReverseVector(end_pos: Pos3D): Vec3D;
              toReverseVector(end_x: double, a1: double, end_y: double): Vec3D;
              toReverseVector(a0: Pos2D): Vec2D;
              toReverseVector(): Vec2D;
              toString(): string;
              toVector(): Vec3D;
              toVector(start_pos: Pos2D): Vec3D;
              toVector(start_pos: Pos3D): Vec3D;
              toVector(start_x: double, a1: double, start_y: double): Vec3D;
              toVector(a0: Pos2D): Vec2D;
              toVector(): Vec2D;
              z: double;
            }
            interface Pos3D extends CombineTypes<[_Pos3D, xyz.wagyourtail.jsmacros.api.math.Pos2D]> {}
            interface _Vec2D$$static extends ClassLike {
              new(x1: double, a1: double, y1: double, a3: double): Vec2D;
              new(start: Pos2D, end: Pos2D): Vec2D;
            }
            let Vec2D: _Vec2D$$static;
            interface _Vec2D {
              add(vec: Vec2D): Vec2D;
              add(x1: double, a1: double, y1: double, a3: double): Vec2D;
              compareTo(other: Vec2D): int;
              dotProduct(vec: Vec2D): double;
              equals(o: any): boolean;
              getDeltaX(): double;
              getDeltaY(): double;
              getEnd(): Pos2D;
              getMagnitude(): double;
              getMagnitudeSq(): double;
              getStart(): Pos2D;
              getX1(): double;
              getX2(): double;
              getY1(): double;
              getY2(): double;
              hashCode(): int;
              multiply(vec: Vec2D): Vec2D;
              multiply(x1: double, a1: double, y1: double, a3: double): Vec2D;
              normalize(): Vec2D;
              reverse(): Vec2D;
              scale(scale: double): Vec2D;
              to3D(): Vec3D;
              toString(): string;
              x1: double;
              x2: double;
              y1: double;
              y2: double;
            }
            interface Vec2D extends CombineTypes<[_Vec2D, java.lang.Object]> {}
            interface _Vec3D$$static extends ClassLike {
              _wrapDegreesSimple(degrees: double): float;
              new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): Vec3D;
              new(start: Pos3D, end: Pos3D): Vec3D;
            }
            let Vec3D: _Vec3D$$static;
            interface _Vec3D {
              add(vec: Vec3D): Vec3D;
              add(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): Vec3D;
              addEnd(pos: Pos3D): Vec3D;
              addEnd(x: double, a1: double, y: double): Vec3D;
              addStart(pos: Pos3D): Vec3D;
              addStart(x: double, a1: double, y: double): Vec3D;
              compareTo(o: Vec3D): int;
              crossProduct(vec: Vec3D): Vec3D;
              dotProduct(vec: Vec3D): double;
              equals(o: any): boolean;
              getDeltaZ(): double;
              getEnd(): Pos3D;
              getEnd(): Pos2D;
              getMagnitude(): double;
              getMagnitudeSq(): double;
              getPitch(mathHelper: IMathHelper): float;
              getPitch(): float;
              getStart(): Pos3D;
              getStart(): Pos2D;
              getYaw(mathHelper: IMathHelper): float;
              getYaw(): float;
              getZ1(): double;
              getZ2(): double;
              hashCode(): int;
              multiply(vec: Vec3D): Vec3D;
              multiply(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): Vec3D;
              normalize(): Vec3D;
              normalize(): Vec2D;
              reverse(): Vec3D;
              reverse(): Vec2D;
              scale(scale: double): Vec3D;
              scale(a0: double): Vec2D;
              toMojangFloatVector(): org.joml.Vector3f;
              toString(): string;
              z1: double;
              z2: double;
            }
            interface Vec3D extends CombineTypes<[_Vec3D, xyz.wagyourtail.jsmacros.api.math.Vec2D]> {}
          }
          interface _PlayerInput$$static extends ClassLike {
            fromCsv(csv: string): java.util.List<PlayerInput>;
            fromJson(json: string): PlayerInput;
            _fromMap(input: java.util.Map<string,string>): PlayerInput;
            _gson: com.google.gson.Gson;
            new(): PlayerInput;
            new(movementForward: float, movementSideways: float, yaw: float): PlayerInput;
            new(movementForward: float, yaw: float, jumping: boolean, sprinting: boolean): PlayerInput;
            new(movementForward: double, a1: double, movementSideways: double, a3: double, yaw: boolean, a5: boolean, pitch: boolean): PlayerInput;
            new(movementForward: float, movementSideways: float, yaw: float, pitch: float, jumping: boolean, sneaking: boolean, sprinting: boolean): PlayerInput;
            new(input: PlayerInput): PlayerInput;
          }
          let PlayerInput: _PlayerInput$$static;
          interface _PlayerInput {
            clone(): PlayerInput;
            clone(): any;
            toString(varNames: boolean): string;
            toString(): string;
            jumping: boolean;
            movementForward: float;
            movementSideways: float;
            pitch: float;
            sneaking: boolean;
            sprinting: boolean;
            yaw: float;
          }
          interface PlayerInput extends CombineTypes<[_PlayerInput, java.lang.Object]> {}
        }
        module client {
          module access {
            interface _BossBarConsumer$$static extends ClassLike {
              new(): BossBarConsumer;
            }
            let BossBarConsumer: _BossBarConsumer$$static;
            interface _BossBarConsumer {
              method_34099(uuid: java.util.UUID): void;
              method_34100(uuid: java.util.UUID, percent: float): void;
              method_34101(id: java.util.UUID, color: net.minecraft.class_1259$class_1260, style: net.minecraft.class_1259$class_1261): void;
              method_34102(uuid: java.util.UUID, name: net.minecraft.class_2561): void;
              method_34103(uuid: java.util.UUID, name: net.minecraft.class_2561, percent: float, color: net.minecraft.class_1259$class_1260, style: net.minecraft.class_1259$class_1261, darkenSky: boolean, dragonMusic: boolean, thickenFog: boolean): void;
              method_34104(uuid: java.util.UUID, darkenSky: boolean, dragonMusic: boolean, thickenFog: boolean): void;
            }
            interface BossBarConsumer extends CombineTypes<[_BossBarConsumer, java.lang.Object, net.minecraft.class_2629$class_5881]> {}
            interface _CommandNodeAccessor$$static extends ClassLike {
              remove<S>(parent: com.mojang.brigadier.tree.CommandNode<S>, name: string): com.mojang.brigadier.tree.CommandNode<S>;
              _arguments: java.lang.reflect.Field;
              _children: java.lang.reflect.Field;
              _literals: java.lang.reflect.Field;
              new(): CommandNodeAccessor;
            }
            let CommandNodeAccessor: _CommandNodeAccessor$$static;
            interface _CommandNodeAccessor {
            }
            interface CommandNodeAccessor extends CombineTypes<[_CommandNodeAccessor, java.lang.Object]> {}
            interface _IChatHud$$static extends ClassLike {
            }
            let IChatHud: _IChatHud$$static;
            interface _IChatHud {
              jsmacros_addMessageAtIndexBypass(a0: net.minecraft.class_2561, a1: int, a2: int): void;
              jsmacros_addMessageBypass(a0: net.minecraft.class_2561): void;
            }
            interface IChatHud extends CombineTypes<[_IChatHud, java.lang.Object]> {}
            interface _IChunkSection$$static extends ClassLike {
            }
            let IChunkSection: _IChunkSection$$static;
            interface _IChunkSection {
              jsmacros_getNonEmptyBlockCount(): short;
              jsmacros_getNonEmptyFluidCount(): short;
              jsmacros_getRandomTickableBlockCount(): short;
            }
            interface IChunkSection extends CombineTypes<[_IChunkSection, java.lang.Object]> {}
            interface _IClientPlayerInteractionManager$$static extends ClassLike {
            }
            let IClientPlayerInteractionManager: _IClientPlayerInteractionManager$$static;
            interface _IClientPlayerInteractionManager {
              jsmacros_getBlockBreakingCooldown(): int;
(): int;
            }
            interface IClientPlayerInteractionManager extends CombineTypes<[_IClientPlayerInteractionManager, java.lang.Object]> {}
            interface _IFontManager$$static extends ClassLike {
            }
            let IFontManager: _IFontManager$$static;
            interface _IFontManager {
              jsmacros_getFontList(): java.util.Set<net.minecraft.class_2960>;
(): java.util.Set<net.minecraft.class_2960>;
            }
            interface IFontManager extends CombineTypes<[_IFontManager, java.lang.Object]> {}
            interface _IHorseScreen$$static extends ClassLike {
            }
            let IHorseScreen: _IHorseScreen$$static;
            interface _IHorseScreen {
              jsmacros_getEntity(): net.minecraft.class_1297;
(): net.minecraft.class_1297;
            }
            interface IHorseScreen extends CombineTypes<[_IHorseScreen, java.lang.Object]> {}
            interface _IInventory$$static extends ClassLike {
            }
            let IInventory: _IInventory$$static;
            interface _IInventory {
              jsmacros_getSlotUnder(a0: double, a1: double): net.minecraft.class_1735;
            }
            interface IInventory extends CombineTypes<[_IInventory, java.lang.Object]> {}
            interface _IItemCooldownEntry$$static extends ClassLike {
            }
            let IItemCooldownEntry: _IItemCooldownEntry$$static;
            interface _IItemCooldownEntry {
              jsmacros_getEndTick(): int;
              jsmacros_getStartTick(): int;
            }
            interface IItemCooldownEntry extends CombineTypes<[_IItemCooldownEntry, java.lang.Object]> {}
            interface _IItemCooldownManager$$static extends ClassLike {
            }
            let IItemCooldownManager: _IItemCooldownManager$$static;
            interface _IItemCooldownManager {
              jsmacros_getCooldownItems(): java.util.Map<net.minecraft.class_1792,IItemCooldownEntry>;
              jsmacros_getManagerTicks(): int;
            }
            interface IItemCooldownManager extends CombineTypes<[_IItemCooldownManager, java.lang.Object]> {}
            interface _ILoomScreen$$static extends ClassLike {
            }
            let ILoomScreen: _ILoomScreen$$static;
            interface _ILoomScreen {
              jsmacros_canApplyDyePattern(): boolean;
(): boolean;
            }
            interface ILoomScreen extends CombineTypes<[_ILoomScreen, java.lang.Object]> {}
            interface _IMerchantEntity$$static extends ClassLike {
            }
            let IMerchantEntity: _IMerchantEntity$$static;
            interface _IMerchantEntity {
              jsmacros_refreshOffers(): void;
(): void;
            }
            interface IMerchantEntity extends CombineTypes<[_IMerchantEntity, java.lang.Object]> {}
            interface _IMerchantScreen$$static extends ClassLike {
            }
            let IMerchantScreen: _IMerchantScreen$$static;
            interface _IMerchantScreen {
              jsmacros_selectIndex(a0: int): void;
(a0: int): void;
            }
            interface IMerchantScreen extends CombineTypes<[_IMerchantScreen, java.lang.Object]> {}
            interface _IMixinEntity$$static extends ClassLike {
            }
            let IMixinEntity: _IMixinEntity$$static;
            interface _IMixinEntity {
              jsmacros_resetColor(): void;
              jsmacros_setForceGlowing(a0: int): void;
              jsmacros_setGlowingColor(a0: int): void;
            }
            interface IMixinEntity extends CombineTypes<[_IMixinEntity, java.lang.Object]> {}
            interface _IMixinInteractionEntity$$static extends ClassLike {
            }
            let IMixinInteractionEntity: _IMixinInteractionEntity$$static;
            interface _IMixinInteractionEntity {
              jsmacros_setCanHitOverride(a0: boolean): void;
(a0: boolean): void;
            }
            interface IMixinInteractionEntity extends CombineTypes<[_IMixinInteractionEntity, java.lang.Object]> {}
            interface _IPackedIntegerArray$$static extends ClassLike {
            }
            let IPackedIntegerArray: _IPackedIntegerArray$$static;
            interface _IPackedIntegerArray {
              jsmacros_getElementsPerLong(): int;
              jsmacros_getIndexOffset(): int;
              jsmacros_getIndexScale(): int;
              jsmacros_getIndexShift(): int;
              jsmacros_getMaxValue(): long;
            }
            interface IPackedIntegerArray extends CombineTypes<[_IPackedIntegerArray, java.lang.Object]> {}
            interface _IPalettedContainer$$static<T> extends ClassLike {
            }
            let IPalettedContainer: _IPalettedContainer$$static<T>;
            interface _IPalettedContainer<T> {
              jsmacros_getData(): IPalettedContainerData<T>;
(): IPalettedContainerData<T>;
            }
            interface IPalettedContainer<T> extends CombineTypes<[_IPalettedContainer<T>, java.lang.Object]> {}
            interface _IPalettedContainerData$$static<T> extends ClassLike {
            }
            let IPalettedContainerData: _IPalettedContainerData$$static<T>;
            interface _IPalettedContainerData<T> {
              jsmacros_getPalette(): net.minecraft.class_2837<T>;
              jsmacros_getStorage(): net.minecraft.class_6490;
            }
            interface IPalettedContainerData<T> extends CombineTypes<[_IPalettedContainerData<T>, java.lang.Object]> {}
            interface _IPlayerListHud$$static extends ClassLike {
            }
            let IPlayerListHud: _IPlayerListHud$$static;
            interface _IPlayerListHud {
              jsmacros_getFooter(): net.minecraft.class_2561;
              jsmacros_getHeader(): net.minecraft.class_2561;
            }
            interface IPlayerListHud extends CombineTypes<[_IPlayerListHud, java.lang.Object]> {}
            interface _IRecipeBookResults$$static extends ClassLike {
            }
            let IRecipeBookResults: _IRecipeBookResults$$static;
            interface _IRecipeBookResults {
              jsmacros_getResultCollections(): java.util.List<net.minecraft.class_516>;
(): java.util.List<net.minecraft.class_516>;
            }
            interface IRecipeBookResults extends CombineTypes<[_IRecipeBookResults, java.lang.Object]> {}
            interface _IRecipeBookWidget$$static extends ClassLike {
            }
            let IRecipeBookWidget: _IRecipeBookWidget$$static;
            interface _IRecipeBookWidget {
              jsmacros_getRecipeBook(): net.minecraft.class_299;
              jsmacros_getResults(): net.minecraft.class_513;
              jsmacros_isSearching(): boolean;
            }
            interface IRecipeBookWidget extends CombineTypes<[_IRecipeBookWidget, java.lang.Object]> {}
            interface _IResourcePackManager$$static extends ClassLike {
            }
            let IResourcePackManager: _IResourcePackManager$$static;
            interface _IResourcePackManager {
              jsmacros_disableServerPacks(a0: boolean): void;
              jsmacros_isServerPacksDisabled(): boolean;
            }
            interface IResourcePackManager extends CombineTypes<[_IResourcePackManager, java.lang.Object]> {}
            interface _IScreenInternal$$static extends ClassLike {
            }
            let IScreenInternal: _IScreenInternal$$static;
            interface _IScreenInternal {
              jsmacros_charTyped(a0: char, a1: int): void;
              jsmacros_keyPressed(a0: int, a1: int, a2: int): void;
              jsmacros_mouseClicked(a0: double, a1: double, a2: int): void;
              jsmacros_mouseDragged(a0: double, a1: double, a2: int, a3: double, a4: double): void;
              jsmacros_mouseReleased(a0: double, a1: double, a2: int): void;
              jsmacros_mouseScrolled(a0: double, a1: double, a2: double, a3: double): void;
              jsmacros_render(a0: net.minecraft.class_332, a1: int, a2: int, a3: float): void;
            }
            interface IScreenInternal extends CombineTypes<[_IScreenInternal, java.lang.Object]> {}
            interface _ISignEditScreen$$static extends ClassLike {
            }
            let ISignEditScreen: _ISignEditScreen$$static;
            interface _ISignEditScreen {
              jsmacros_fixSelection(): void;
              jsmacros_setLine(a0: int, a1: string): void;
            }
            interface ISignEditScreen extends CombineTypes<[_ISignEditScreen, java.lang.Object]> {}
          }
          module api {
            module classes {
              module inventory {
                interface _AnvilInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_471): AnvilInventory;
                }
                let AnvilInventory: _AnvilInventory$$static;
                interface _AnvilInventory {
                  getItemRepairCost(): int;
                  getLeftInput(): api.helper.inventory.ItemStackHelper;
                  getLevelCost(): int;
                  getMaximumLevelCost(): int;
                  getName(): string;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  getRightInput(): api.helper.inventory.ItemStackHelper;
                  setName(name: string): AnvilInventory;
                  toString(): string;
                }
                interface AnvilInventory extends CombineTypes<[_AnvilInventory, Inventory<net.minecraft.class_471>]> {}
                interface _BeaconInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_466): BeaconInventory;
                }
                let BeaconInventory: _BeaconInventory$$static;
                interface _BeaconInventory {
                  applyEffects(): boolean;
                  getFirstEffect(): string;
                  getLevel(): int;
                  getSecondEffect(): string;
                  selectFirstEffect(id: string): boolean;
                  selectSecondEffect(id: string): boolean;
                  toString(): string;
                }
                interface BeaconInventory extends CombineTypes<[_BeaconInventory, Inventory<net.minecraft.class_466>]> {}
                interface _BrewingStandInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_472): BrewingStandInventory;
                }
                let BrewingStandInventory: _BrewingStandInventory$$static;
                interface _BrewingStandInventory {
                  canBrewCurrentInput(): boolean;
                  getBrewTime(): int;
                  getFirstPotion(): api.helper.inventory.ItemStackHelper;
                  getFuel(): api.helper.inventory.ItemStackHelper;
                  getFuelCount(): int;
                  getIngredient(): api.helper.inventory.ItemStackHelper;
                  getMaxFuelUses(): int;
                  getPotions(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getRemainingTicks(): int;
                  getSecondPotion(): api.helper.inventory.ItemStackHelper;
                  getThirdPotion(): api.helper.inventory.ItemStackHelper;
                  isBrewablePotion(potion: api.helper.inventory.ItemStackHelper): boolean;
                  isValidIngredient(ingredient: api.helper.inventory.ItemStackHelper): boolean;
                  isValidRecipe(potion: api.helper.inventory.ItemStackHelper, ingredient: api.helper.inventory.ItemStackHelper): boolean;
                  previewPotion(potion: api.helper.inventory.ItemStackHelper, ingredient: api.helper.inventory.ItemStackHelper): api.helper.inventory.ItemStackHelper;
                  previewPotions(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  toString(): string;
                }
                interface BrewingStandInventory extends CombineTypes<[_BrewingStandInventory, Inventory<net.minecraft.class_472>]> {}
                interface _CartographyInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_3934): CartographyInventory;
                }
                let CartographyInventory: _CartographyInventory$$static;
                interface _CartographyInventory {
                  getMapItem(): api.helper.inventory.ItemStackHelper;
                  getMaterial(): api.helper.inventory.ItemStackHelper;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  toString(): string;
                }
                interface CartographyInventory extends CombineTypes<[_CartographyInventory, Inventory<net.minecraft.class_3934>]> {}
                interface _ChatHistoryManager$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(hud: net.minecraft.class_338): ChatHistoryManager;
                }
                let ChatHistoryManager: _ChatHistoryManager$$static;
                interface _ChatHistoryManager {
                  clearRecv(): void;
                  clearRecv(await: boolean): void;
                  clearSent(): void;
                  clearSent(await: boolean): void;
                  getRecvCount(): int;
                  getRecvLine(index: int): api.helper.screen.ChatHudLineHelper;
                  getRecvLines(): java.util.List<api.helper.screen.ChatHudLineHelper>;
                  getSent(): java.util.List<string>;
                  insertRecvText(index: int, line: api.helper.TextHelper): void;
                  insertRecvText(index: int, line: api.helper.TextHelper, timeTicks: int): void;
                  insertRecvText(index: int, line: api.helper.TextHelper, timeTicks: int, await: boolean): void;
                  refreshVisible(): void;
                  refreshVisible(await: boolean): void;
                  removeRecvText(index: int): void;
                  removeRecvText(index: int, await: boolean): void;
                  removeRecvTextMatching(text: api.helper.TextHelper): void;
                  removeRecvTextMatching(text: api.helper.TextHelper, await: boolean): void;
                  removeRecvTextMatchingFilter(filter: jsmacros.core.MethodWrapper<api.helper.screen.ChatHudLineHelper,any,boolean,any>): void;
                  removeRecvTextMatchingFilter(filter: jsmacros.core.MethodWrapper<api.helper.screen.ChatHudLineHelper,any,boolean,any>, await: boolean): void;
                  _hud: net.minecraft.class_338;
                }
                interface ChatHistoryManager extends CombineTypes<[_ChatHistoryManager, java.lang.Object]> {}
                interface _CommandBuilder$$static extends ClassLike {
                  new(): CommandBuilder;
                }
                let CommandBuilder: _CommandBuilder$$static;
                interface _CommandBuilder {
                  angleArg(name: string): CommandBuilder;
                  _argument(a0: string, a1: java.util.function.Supplier<com.mojang.brigadier.arguments.ArgumentType<any>>): void;
                  _argument(a0: string, a1: java.util.function.Function<net.minecraft.class_7157,com.mojang.brigadier.arguments.ArgumentType<any>>): void;
                  blockArg(name: string): CommandBuilder;
                  blockPosArg(name: string): CommandBuilder;
                  blockPredicateArg(name: string): CommandBuilder;
                  blockStateArg(name: string): CommandBuilder;
                  booleanArg(name: string): CommandBuilder;
                  colorArg(name: string): CommandBuilder;
                  columnPosArg(name: string): CommandBuilder;
                  dimensionArg(name: string): CommandBuilder;
                  doubleArg(name: string): CommandBuilder;
                  doubleArg(name: string, min: double, a2: double): CommandBuilder;
                  executes(a0: jsmacros.core.MethodWrapper<api.helper.CommandContextHelper,any,any,any>): CommandBuilder;
                  floatRangeArg(name: string): CommandBuilder;
                  greedyStringArg(name: string): CommandBuilder;
                  identifierArg(name: string): CommandBuilder;
                  intArg(name: string): CommandBuilder;
                  intArg(name: string, min: int, max: int): CommandBuilder;
                  intRangeArg(name: string): CommandBuilder;
                  _internalExecutes<S>(context: com.mojang.brigadier.context.CommandContext<S>, callback: jsmacros.core.MethodWrapper<api.helper.CommandContextHelper,any,any,any>): int;
                  itemArg(name: string): CommandBuilder;
                  itemPredicateArg(name: string): CommandBuilder;
                  itemSlotArg(name: string): CommandBuilder;
                  itemStackArg(name: string): CommandBuilder;
                  literalArg(a0: string): CommandBuilder;
                  longArg(name: string): CommandBuilder;
                  longArg(name: string, min: long, a2: long): CommandBuilder;
                  nbtArg(name: string): CommandBuilder;
                  nbtCompoundArg(name: string): CommandBuilder;
                  nbtElementArg(name: string): CommandBuilder;
                  or(): CommandBuilder;
                  or(a0: int): CommandBuilder;
                  otherwise(): CommandBuilder;
                  otherwise(argLevel: int): CommandBuilder;
                  particleArg(name: string): CommandBuilder;
                  quotedStringArg(name: string): CommandBuilder;
                  regexArgType(name: string, regex: string, flags: string): CommandBuilder;
                  register(): CommandBuilder;
                  register(): any;
                  suggest(callback: jsmacros.core.MethodWrapper<api.helper.CommandContextHelper,api.helper.SuggestionsBuilderHelper,any,any>): CommandBuilder;
                  suggestBlockPositions(positions: api.helper.world.BlockPosHelper[]): CommandBuilder;
                  suggestBlockPositions(...positions: api.helper.world.BlockPosHelper[]): CommandBuilder;
                  suggestBlockPositions(positions: java.util.Collection<api.helper.world.BlockPosHelper>): CommandBuilder;
                  suggestIdentifier(suggestions: string[]): CommandBuilder;
                  suggestIdentifier(...suggestions: string[]): CommandBuilder;
                  suggestIdentifier(suggestions: java.util.Collection<string>): CommandBuilder;
                  suggestMatching(suggestions: string[]): CommandBuilder;
                  suggestMatching(...suggestions: string[]): CommandBuilder;
                  suggestMatching(suggestions: java.util.Collection<string>): CommandBuilder;
                  suggestPositions(positions: string[]): CommandBuilder;
                  suggestPositions(...positions: string[]): CommandBuilder;
                  suggestPositions(positions: java.util.Collection<string>): CommandBuilder;
                  _suggests<S>(a0: com.mojang.brigadier.suggestion.SuggestionProvider<S>): void;
                  textArgType(name: string): CommandBuilder;
                  timeArg(name: string): CommandBuilder;
                  unregister(): CommandBuilder;
                  unregister(): any;
                  uuidArgType(name: string): CommandBuilder;
                  wordArg(name: string): CommandBuilder;
                }
                interface CommandBuilder extends CombineTypes<[_CommandBuilder, jsmacros.core.classes.Registrable<CommandBuilder>, java.lang.Object]> {}
                interface _CommandBuilder$RegexArgType$$static extends ClassLike {
                  new(regex: string, flags: int): CommandBuilder$RegexArgType;
                }
                let CommandBuilder$RegexArgType: _CommandBuilder$RegexArgType$$static;
                interface _CommandBuilder$RegexArgType {
                  parse(reader: com.mojang.brigadier.StringReader): string[];
                  parse(a0: com.mojang.brigadier.StringReader): any;
                  _pattern: java.util.regex.Pattern;
                }
                interface CommandBuilder$RegexArgType extends CombineTypes<[_CommandBuilder$RegexArgType, java.lang.Object, com.mojang.brigadier.arguments.ArgumentType<string[]>]> {}
                interface _CommandManager$$static extends ClassLike {
                  instance: CommandManager;
                  _mc: net.minecraft.class_310;
                  new(): CommandManager;
                }
                let CommandManager: _CommandManager$$static;
                interface _CommandManager {
                  createCommandBuilder(a0: string): CommandBuilder;
                  getArgumentAutocompleteOptions(commandPart: string, callback: jsmacros.core.MethodWrapper<java.util.List<string>,any,any,any>): void;
                  getValidCommands(): java.util.List<string>;
                  reRegisterCommand(a0: api.helper.CommandNodeHelper): void;
                  unregisterCommand(a0: string): api.helper.CommandNodeHelper;
                }
                interface CommandManager extends CombineTypes<[_CommandManager, java.lang.Object]> {}
                interface _ContainerInventory$$static<T> extends ClassLike {
                  new(inventory: T): ContainerInventory<T>;
                }
                let ContainerInventory: _ContainerInventory$$static<T>;
                interface _ContainerInventory<T> {
                  findFreeContainerSlot(): int;
                  toString(): string;
                }
                interface ContainerInventory<T> extends CombineTypes<[_ContainerInventory<T>, Inventory<T>]> {}
                interface _CraftingInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_479): CraftingInventory;
                }
                let CraftingInventory: _CraftingInventory$$static;
                interface _CraftingInventory {
                  getCraftingHeight(): int;
                  getCraftingSlotCount(): int;
                  getCraftingWidth(): int;
                  getInput(x: int, y: int): api.helper.inventory.ItemStackHelper;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  toString(): string;
                }
                interface CraftingInventory extends CombineTypes<[_CraftingInventory, RecipeInventory<net.minecraft.class_479>]> {}
                interface _CreativeInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_481): CreativeInventory;
                }
                let CreativeInventory: _CreativeInventory$$static;
                interface _CreativeInventory {
                  destroyAllItems(): CreativeInventory;
                  destroyHeldItem(): CreativeInventory;
                  getBoots(): api.helper.inventory.ItemStackHelper;
                  getChestplate(): api.helper.inventory.ItemStackHelper;
                  getHelmet(): api.helper.inventory.ItemStackHelper;
                  getLeggings(): api.helper.inventory.ItemStackHelper;
                  getOffhand(): api.helper.inventory.ItemStackHelper;
                  getSavedHotbar(index: int): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getShownItems(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getTabNames(): java.util.List<string>;
                  getTabTexts(): java.util.List<api.helper.TextHelper>;
                  isInHotbar(slot: int): boolean;
                  restoreHotbar(index: int): CreativeInventory;
                  saveHotbar(index: int): CreativeInventory;
                  scroll(amount: double): CreativeInventory;
                  scrollTo(position: double): CreativeInventory;
                  search(search: string): CreativeInventory;
                  selectHotbar(): CreativeInventory;
                  selectInventory(): CreativeInventory;
                  selectSearch(): CreativeInventory;
                  selectTab(tabName: string): CreativeInventory;
                  _selectTab(group: net.minecraft.class_1761): CreativeInventory;
                  setCursorStack(stack: api.helper.inventory.ItemStackHelper): CreativeInventory;
                  setStack(slot: int, stack: api.helper.inventory.ItemStackHelper): CreativeInventory;
                  toString(): string;
                  _handler: net.minecraft.class_481$class_483;
                }
                interface CreativeInventory extends CombineTypes<[_CreativeInventory, Inventory<net.minecraft.class_481>]> {}
                interface _EnchantInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_486): EnchantInventory;
                }
                let EnchantInventory: _EnchantInventory$$static;
                interface _EnchantInventory {
                  doEnchant(index: int): boolean;
                  getEnchantmentHelpers(): api.helper.inventory.EnchantmentHelper[];
                  getEnchantmentIds(): string[];
                  getEnchantmentLevels(): int[];
                  getEnchantments(): api.helper.TextHelper[];
                  getItemToEnchant(): api.helper.inventory.ItemStackHelper;
                  getLapis(): api.helper.inventory.ItemStackHelper;
                  getRequiredLevels(): int[];
                  toString(): string;
                }
                interface EnchantInventory extends CombineTypes<[_EnchantInventory, Inventory<net.minecraft.class_486>]> {}
                interface _FurnaceInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_489<any>): FurnaceInventory;
                }
                let FurnaceInventory: _FurnaceInventory$$static;
                interface _FurnaceInventory {
                  canUseAsFuel(stack: api.helper.inventory.ItemStackHelper): boolean;
                  getCraftingHeight(): int;
                  getCraftingSlotCount(): int;
                  getCraftingWidth(): int;
                  getFuel(): api.helper.inventory.ItemStackHelper;
                  getFuelValues(): java.util.Map<string,int>;
                  getInput(x: int, y: int): api.helper.inventory.ItemStackHelper;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  _getPropertyDelegate(): net.minecraft.class_3913;
                  getRemainingFuelTime(): int;
                  getRemainingSmeltingTime(): int;
                  getSmeltedItem(): api.helper.inventory.ItemStackHelper;
                  getSmeltingProgress(): int;
                  getTotalFuelTime(): int;
                  getTotalSmeltingTime(): int;
                  isBurning(): boolean;
                  isSmeltable(stack: api.helper.inventory.ItemStackHelper): boolean;
                  toString(): string;
                }
                interface FurnaceInventory extends CombineTypes<[_FurnaceInventory, RecipeInventory<net.minecraft.class_489<any>>]> {}
                interface _GrindStoneInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_3802): GrindStoneInventory;
                }
                let GrindStoneInventory: _GrindStoneInventory$$static;
                interface _GrindStoneInventory {
                  getBottomInput(): api.helper.inventory.ItemStackHelper;
                  _getExperience(stack: net.minecraft.class_1799): int;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  getTopInput(): api.helper.inventory.ItemStackHelper;
                  simulateXp(): int;
                  toString(): string;
                }
                interface GrindStoneInventory extends CombineTypes<[_GrindStoneInventory, Inventory<net.minecraft.class_3802>]> {}
                interface _HorseInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_491): HorseInventory;
                }
                let HorseInventory: _HorseInventory$$static;
                interface _HorseInventory {
                  canBeSaddled(): boolean;
                  getArmor(): api.helper.inventory.ItemStackHelper;
                  getHorse(): api.helper.world.entity.specialized.passive.AbstractHorseEntityHelper<any>;
                  getHorseInventory(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getInventorySize(): int;
                  getSaddle(): api.helper.inventory.ItemStackHelper;
                  hasArmorSlot(): boolean;
                  hasChest(): boolean;
                  isSaddled(): boolean;
                  toString(): string;
                  _horse: net.minecraft.class_1496;
                }
                interface HorseInventory extends CombineTypes<[_HorseInventory, Inventory<net.minecraft.class_491>]> {}
                interface _Inventory$$static<T> extends ClassLike {
                  create(): Inventory<any>;
                  create(s: net.minecraft.class_437): Inventory<any>;
                  _mc: net.minecraft.class_310;
                  _new(inventory: T): Inventory<T>;
                }
                let Inventory: _Inventory$$static<T>;
                interface _Inventory<T> {
                  click(slot: int): Inventory<T>;
                  click(slot: int, mousebutton: int): Inventory<T>;
                  close(): void;
                  closeAndDrop(): Inventory<T>;
                  contains(item: api.helper.inventory.ItemStackHelper): boolean;
                  contains(item: string): boolean;
                  dragClick(slots: int[], mousebutton: int): Inventory<T>;
                  dropSlot(slot: int): Inventory<T>;
                  dropSlot(slot: int, stack: boolean): Inventory<T>;
                  findFreeHotbarSlot(): int;
                  findFreeInventorySlot(): int;
                  findFreeSlot(mapIdentifiers: string[]): int;
                  findFreeSlot(...mapIdentifiers: string[]): int;
                  findItem(item: api.helper.inventory.ItemStackHelper): int[];
                  findItem(item: string): int[];
                  getContainerTitle(): string;
                  getCurrentSyncId(): int;
                  getHeld(): api.helper.inventory.ItemStackHelper;
                  getItemCount(): java.util.Map<string,int>;
                  getItems(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getItems(mapIdentifiers: string[]): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getItems(...mapIdentifiers: string[]): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getLocation(slotNum: int): string;
                  getMap(): java.util.Map<string,int[]>;
                  _getMapInternal(): java.util.Map<string,int[]>;
                  getRawContainer(): T;
                  getSelectedHotbarSlotIndex(): int;
                  getSlot(slot: int): api.helper.inventory.ItemStackHelper;
                  getSlotPos(slot: int): jsmacros.api.math.Pos2D;
                  getSlotUnderMouse(): int;
                  getSlots(mapIdentifiers: string[]): int[];
                  getSlots(...mapIdentifiers: string[]): int[];
                  getTotalSlots(): int;
                  getType(): string;
                  grabAll(slot: int): Inventory<T>;
                  is(types: string[]): boolean;
                  is(...types: string[]): boolean;
                  isContainer(): boolean;
                  openGui(): void;
                  quick(slot: int): Inventory<T>;
                  quickAll(slot: int): int;
                  quickAll(slot: int, button: int): int;
                  setSelectedHotbarSlotIndex(index: int): void;
                  split(slot1: int, slot2: int): Inventory<T>;
                  swap(slot1: int, slot2: int): Inventory<T>;
                  swapHotbar(slot: int, hotbarSlot: int): Inventory<T>;
                  toString(): string;
                  _handler: net.minecraft.class_1703;
                  _inventory: T;
                  _man: net.minecraft.class_636;
                  _map: java.util.Map<string,int[]>;
                  _player: net.minecraft.class_746;
                  _syncId: int;
                }
                interface Inventory<T> extends CombineTypes<[_Inventory<T>, java.lang.Object]> {}
                interface _LoomInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_494): LoomInventory;
                }
                let LoomInventory: _LoomInventory$$static;
                interface _LoomInventory {
                  _getPatternsFor(stack: net.minecraft.class_1799): java.util.List<net.minecraft.class_6880<net.minecraft.class_2582>>;
                  listAvailablePatterns(): java.util.List<string>;
                  selectPattern(index: int): boolean;
                  selectPatternId(id: string): boolean;
                  selectPatternName(name: string): boolean;
                  toString(): string;
                }
                interface LoomInventory extends CombineTypes<[_LoomInventory, Inventory<net.minecraft.class_494>]> {}
                interface _PlayerInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_490): PlayerInventory;
                }
                let PlayerInventory: _PlayerInventory$$static;
                interface _PlayerInventory {
                  getBoots(): api.helper.inventory.ItemStackHelper;
                  getChestplate(): api.helper.inventory.ItemStackHelper;
                  getCraftingHeight(): int;
                  getCraftingSlotCount(): int;
                  getCraftingWidth(): int;
                  getHelmet(): api.helper.inventory.ItemStackHelper;
                  getInput(x: int, y: int): api.helper.inventory.ItemStackHelper;
                  getLeggings(): api.helper.inventory.ItemStackHelper;
                  getOffhand(): api.helper.inventory.ItemStackHelper;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  isInHotbar(slot: int): boolean;
                  toString(): string;
                }
                interface PlayerInventory extends CombineTypes<[_PlayerInventory, RecipeInventory<net.minecraft.class_490>]> {}
                interface _RecipeInventory$$static<T> extends ClassLike {
                  _new(inventory: T): RecipeInventory<T>;
                }
                let RecipeInventory: _RecipeInventory$$static<T>;
                interface _RecipeInventory<T> {
                  getCategory(): string;
                  getCraftableRecipes(): java.util.List<api.helper.inventory.RecipeHelper>;
                  getCraftingHeight(): int;
                  getCraftingSlotCount(): int;
                  getCraftingWidth(): int;
                  getInput(a0: int, a1: int): api.helper.inventory.ItemStackHelper;
                  getInput(): api.helper.inventory.ItemStackHelper[][];
                  getInputSize(): int;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  _getRecipeBookWidget(): net.minecraft.class_507<any>;
                  getRecipes(craftable: boolean): java.util.List<api.helper.inventory.RecipeHelper>;
                  isRecipeBookOpened(): boolean;
                  setRecipeBook(open: boolean): void;
                  toggleRecipeBook(): void;
                  _handler: net.minecraft.class_1729;
                }
                interface RecipeInventory<T> extends CombineTypes<[_RecipeInventory<T>, Inventory<T>]> {}
                interface _SmithingInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_4895): SmithingInventory;
                }
                let SmithingInventory: _SmithingInventory$$static;
                interface _SmithingInventory {
                  getLeftInput(): api.helper.inventory.ItemStackHelper;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  getRightInput(): api.helper.inventory.ItemStackHelper;
                  toString(): string;
                }
                interface SmithingInventory extends CombineTypes<[_SmithingInventory, Inventory<net.minecraft.class_4895>]> {}
                interface _StoneCutterInventory$$static extends ClassLike {
                  new(inventory: net.minecraft.class_3979): StoneCutterInventory;
                }
                let StoneCutterInventory: _StoneCutterInventory$$static;
                interface _StoneCutterInventory {
                  canCraft(): boolean;
                  getAvailableRecipeCount(): int;
                  getOutput(): api.helper.inventory.ItemStackHelper;
                  getRecipes(): java.util.List<api.helper.inventory.ItemStackHelper>;
                  getSelectedRecipeIndex(): int;
                  selectRecipe(idx: int): StoneCutterInventory;
                  toString(): string;
                }
                interface StoneCutterInventory extends CombineTypes<[_StoneCutterInventory, Inventory<net.minecraft.class_3979>]> {}
                interface _VillagerInventory$$static extends ClassLike {
                  _new(inventory: net.minecraft.class_492): VillagerInventory;
                }
                let VillagerInventory: _VillagerInventory$$static;
                interface _VillagerInventory {
                  canRefreshTrades(): boolean;
                  getExperience(): int;
                  getLevelProgress(): int;
                  getMerchantRewardedExperience(): int;
                  getTrades(): java.util.List<api.helper.world.entity.TradeOfferHelper>;
                  isLeveled(): boolean;
                  selectTrade(index: int): VillagerInventory;
                  toString(): string;
                }
                interface VillagerInventory extends CombineTypes<[_VillagerInventory, Inventory<net.minecraft.class_492>]> {}
              }
              module render {
                module components {
                  interface _Alignable$$static<B> extends ClassLike {
                    parsePercentage(string: string): int;
                  }
                  let Alignable: _Alignable$$static<B>;
                  interface _Alignable<B> {
                    align(horizontal: string, vertical: string): B;
                    align(horizontal: string, horizontalOffset: int, vertical: string, verticalOffset: int): B;
                    align(other: Alignable<any>, horizontal: string, vertical: string): B;
                    align(other: Alignable<any>, horizontal: string, horizontalOffset: int, vertical: string, verticalOffset: int): B;
                    alignHorizontally(other: Alignable<any>, alignment: string): B;
                    alignHorizontally(other: Alignable<any>, alignment: string, offset: int): B;
                    alignHorizontally(alignment: string): B;
                    alignHorizontally(alignment: string, offset: int): B;
                    alignVertically(other: Alignable<any>, alignment: string): B;
                    alignVertically(other: Alignable<any>, alignment: string, offset: int): B;
                    alignVertically(alignment: string): B;
                    alignVertically(alignment: string, offset: int): B;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getScaledBottom(): int;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledRight(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    moveTo(a0: int, a1: int): B;
                    moveToX(x: int): B;
                    moveToY(y: int): B;
                  }
                  interface Alignable<B> extends CombineTypes<[_Alignable<B>, java.lang.Object]> {}
                  interface _Draw2DElement$$static extends ClassLike {
                    new(draw2D: Draw2D, x: int, y: int, width: java.util.function.IntSupplier, height: java.util.function.IntSupplier, zIndex: int, scale: float, rotation: float): Draw2DElement;
                  }
                  let Draw2DElement: _Draw2DElement$$static;
                  interface _Draw2DElement {
                    getDraw2D(): Draw2D;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Draw2DElement;
                    moveTo(a0: int, a1: int): Alignable;
                    setHeight(height: int): Draw2DElement;
                    setParent(parent: IDraw2D<any>): Draw2DElement;
                    setPos(x: int, y: int): Draw2DElement;
                    setRotateCenter(rotateCenter: boolean): Draw2DElement;
                    setRotation(rotation: double): Draw2DElement;
                    setScale(scale: double): Draw2DElement;
                    setSize(width: int, height: int): Draw2DElement;
                    setWidth(width: int): Draw2DElement;
                    setX(x: int): Draw2DElement;
                    setY(y: int): Draw2DElement;
                    setZIndex(zIndex: int): Draw2DElement;
                    readonly draw2D: Draw2D;
                    height: java.util.function.IntSupplier;
                    parent: IDraw2D<any>;
                    rotateCenter: boolean;
                    rotation: float;
                    scale: float;
                    width: java.util.function.IntSupplier;
                    x: int;
                    y: int;
                    zIndex: int;
                  }
                  interface Draw2DElement extends CombineTypes<[_Draw2DElement, RenderElement, Alignable<Draw2DElement>, java.lang.Object]> {}
                  interface _Draw2DElement$Builder$$static extends ClassLike {
                    new(parent: IDraw2D<any>, draw2D: Draw2D): Draw2DElement$Builder;
                  }
                  let Draw2DElement$Builder: _Draw2DElement$Builder$$static;
                  interface _Draw2DElement$Builder {
                    _createElement(): Draw2DElement;
                    _createElement(): RenderElement;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    height(height: int): Draw2DElement$Builder;
                    isRotatingCenter(): boolean;
                    moveTo(x: int, y: int): Draw2DElement$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    pos(x: int, y: int): Draw2DElement$Builder;
                    rotateCenter(rotateCenter: boolean): Draw2DElement$Builder;
                    rotation(rotation: double): Draw2DElement$Builder;
                    scale(scale: double): Draw2DElement$Builder;
                    size(width: int, height: int): Draw2DElement$Builder;
                    width(width: int): Draw2DElement$Builder;
                    x(x: int): Draw2DElement$Builder;
                    y(y: int): Draw2DElement$Builder;
                    zIndex(zIndex: int): Draw2DElement$Builder;
                    _draw2D: Draw2D;
                    _height: java.util.function.IntSupplier;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _scale: float;
                    _width: java.util.function.IntSupplier;
                    _x: int;
                    _y: int;
                    _zIndex: int;
                  }
                  interface Draw2DElement$Builder extends CombineTypes<[_Draw2DElement$Builder, Alignable<Draw2DElement$Builder>, RenderElementBuilder<Draw2DElement>]> {}
                  interface _Image$$static extends ClassLike {
                    _mc: net.minecraft.class_310;
                    new(x: int, y: int, width: int, height: int, zIndex: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: float): Image;
                    new(x: int, y: int, width: int, height: int, zIndex: int, alpha: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: float): Image;
                  }
                  let Image: _Image$$static;
                  interface _Image {
                    getAlpha(): int;
                    getColor(): int;
                    getHeight(): int;
                    getImage(): string;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Image;
                    moveTo(a0: int, a1: int): Alignable;
                    setColor(color: int): Image;
                    setColor(color: int, alpha: int): Image;
                    setHeight(height: int): Image;
                    setImage(id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int): Image;
                    setParent(parent: IDraw2D<any>): Image;
                    setPos(x: int, y: int): Image;
                    setPos(x: int, y: int, width: int, height: int): Image;
                    setRotateCenter(rotateCenter: boolean): Image;
                    setRotation(rotation: double): Image;
                    setSize(width: int, height: int): Image;
                    setWidth(width: int): Image;
                    setX(x: int): Image;
                    setY(y: int): Image;
                    setZIndex(zIndex: int): Image;
                    color: int;
                    height: int;
                    imageX: int;
                    imageY: int;
                    _imageid: net.minecraft.class_2960;
                    parent: IDraw2D<any>;
                    regionHeight: int;
                    regionWidth: int;
                    rotateCenter: boolean;
                    rotation: float;
                    textureHeight: int;
                    textureWidth: int;
                    width: int;
                    x: int;
                    y: int;
                    zIndex: int;
                  }
                  interface Image extends CombineTypes<[_Image, RenderElement, java.lang.Object, Alignable<Image>]> {}
                  interface _Image$Builder$$static extends ClassLike {
                    new(draw2D: IDraw2D<any>): Image$Builder;
                  }
                  let Image$Builder: _Image$Builder$$static;
                  interface _Image$Builder {
                    alpha(alpha: int): Image$Builder;
                    color(color: int): Image$Builder;
                    color(r: int, g: int, b: int): Image$Builder;
                    color(r: int, g: int, b: int, a: int): Image$Builder;
                    color(color: int, alpha: int): Image$Builder;
                    createElement(): Image;
                    createElement(): RenderElement;
                    fromCustomImage(customImage: CustomImage): Image$Builder;
                    getAlpha(): int;
                    getColor(): int;
                    getHeight(): int;
                    getIdentifier(): string;
                    getImageX(): int;
                    getImageY(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRegionHeight(): int;
                    getRegionWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getTextureHeight(): int;
                    getTextureWidth(): int;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    height(height: int): Image$Builder;
                    identifier(identifier: string): Image$Builder;
                    imagePos(imageX: int, imageY: int): Image$Builder;
                    imageX(imageX: int): Image$Builder;
                    imageY(imageY: int): Image$Builder;
                    isRotatingCenter(): boolean;
                    moveTo(x: int, y: int): Image$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    pos(x: int, y: int): Image$Builder;
                    regionHeight(regionHeight: int): Image$Builder;
                    regionSize(regionWidth: int, regionHeight: int): Image$Builder;
                    regionWidth(regionWidth: int): Image$Builder;
                    regions(x: int, y: int, width: int, height: int): Image$Builder;
                    regions(x: int, y: int, width: int, height: int, textureWidth: int, textureHeight: int): Image$Builder;
                    rotateCenter(rotateCenter: boolean): Image$Builder;
                    rotation(rotation: double): Image$Builder;
                    size(width: int, height: int): Image$Builder;
                    textureHeight(textureHeight: int): Image$Builder;
                    textureSize(textureWidth: int, textureHeight: int): Image$Builder;
                    textureWidth(textureWidth: int): Image$Builder;
                    width(width: int): Image$Builder;
                    x(x: int): Image$Builder;
                    y(y: int): Image$Builder;
                    zIndex(zIndex: int): Image$Builder;
                    _alpha: int;
                    _color: int;
                    _height: int;
                    _identifier: string;
                    _imageX: int;
                    _imageY: int;
                    _regionHeight: int;
                    _regionWidth: int;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _textureHeight: int;
                    _textureWidth: int;
                    _width: int;
                    _x: int;
                    _y: int;
                    _zIndex: int;
                  }
                  interface Image$Builder extends CombineTypes<[_Image$Builder, RenderElementBuilder<Image>, Alignable<Image$Builder>]> {}
                  interface _Item$$static extends ClassLike {
                    _DEFAULT_ITEM_SIZE: int;
                    _mc: net.minecraft.class_310;
                    new(x: int, y: int, zIndex: int, id: string, overlay: boolean, scale: double, a6: float): Item;
                    new(x: int, y: int, zIndex: int, i: api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a6: float): Item;
                    new(x: int, y: int, zIndex: int, itemStack: api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a6: float, rotation: string): Item;
                  }
                  let Item: _Item$$static;
                  interface _Item {
                    getItem(): api.helper.inventory.ItemStackHelper;
                    getOverlayText(): string;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): double;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Item;
                    moveTo(a0: int, a1: int): Alignable;
                    render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float, is3dRender: boolean): void;
                    render3D(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    setItem(i: api.helper.inventory.ItemStackHelper): Item;
                    setItem(id: string, count: int): Item;
                    setOverlay(overlay: boolean): Item;
                    setOverlayText(ovText: string): Item;
                    setParent(parent: IDraw2D<any>): Item;
                    setPos(x: int, y: int): Item;
                    setRotateCenter(rotateCenter: boolean): Item;
                    setRotation(rotation: double): Item;
                    setScale(scale: double): Item;
                    setX(x: int): Item;
                    setY(y: int): Item;
                    setZIndex(zIndex: int): Item;
                    shouldShowOverlay(): boolean;
                    item: net.minecraft.class_1799;
                    ovText: string;
                    overlay: boolean;
                    parent: IDraw2D<any>;
                    rotateCenter: boolean;
                    rotation: float;
                    scale: double;
                    x: int;
                    y: int;
                    zIndex: int;
                  }
                  interface Item extends CombineTypes<[_Item, RenderElement, Alignable<Item>, java.lang.Object]> {}
                  interface _Item$Builder$$static extends ClassLike {
                    new(draw2D: IDraw2D<any>): Item$Builder;
                  }
                  let Item$Builder: _Item$Builder$$static;
                  interface _Item$Builder {
                    _createElement(): Item;
                    _createElement(): RenderElement;
                    getItem(): api.helper.inventory.ItemStackHelper;
                    getOverlayText(): string;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): double;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    isOverlayVisible(): boolean;
                    isRotatingCenter(): boolean;
                    item(item: api.helper.inventory.ItemStackHelper): Item$Builder;
                    item(id: string): Item$Builder;
                    item(id: string, count: int): Item$Builder;
                    moveTo(x: int, y: int): Item$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    overlayText(overlayText: string): Item$Builder;
                    overlayVisible(visible: boolean): Item$Builder;
                    pos(x: int, y: int): Item$Builder;
                    rotateCenter(rotateCenter: boolean): Item$Builder;
                    rotation(rotation: double): Item$Builder;
                    scale(scale: double): Item$Builder;
                    x(x: int): Item$Builder;
                    y(y: int): Item$Builder;
                    zIndex(zIndex: int): Item$Builder;
                    _itemStack: api.helper.inventory.ItemStackHelper;
                    _ovText: string;
                    _overlay: boolean;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _scale: double;
                    _x: int;
                    _y: int;
                    _zIndex: int;
                  }
                  interface Item$Builder extends CombineTypes<[_Item$Builder, Alignable<Item$Builder>, RenderElementBuilder<Item>]> {}
                  interface _Line$$static extends ClassLike {
                    new(x1: int, y1: int, x2: int, y2: int, color: int, rotation: float, width: float, zIndex: int): Line;
                  }
                  let Line: _Line$$static;
                  interface _Line {
                    getAlpha(): int;
                    getColor(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): float;
                    getX1(): int;
                    getX2(): int;
                    getY1(): int;
                    getY2(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Line;
                    moveTo(a0: int, a1: int): Alignable;
                    setAlpha(alpha: int): Line;
                    setColor(color: int): Line;
                    setColor(color: int, alpha: int): Line;
                    setParent(parent: IDraw2D<any>): Line;
                    setPos(x1: int, y1: int, x2: int, y2: int): Line;
                    setPos1(x1: int, y1: int): Line;
                    setPos2(x2: int, y2: int): Line;
                    setRotateCenter(rotateCenter: boolean): Line;
                    setRotation(rotation: double): Line;
                    setWidth(width: double): Line;
                    setX1(x1: int): Line;
                    setX2(x2: int): Line;
                    setY1(y1: int): Line;
                    setY2(y2: int): Line;
                    setZIndex(zIndex: int): Line;
                    color: int;
                    parent: IDraw2D<any>;
                    rotateCenter: boolean;
                    rotation: float;
                    width: float;
                    x1: int;
                    x2: int;
                    y1: int;
                    y2: int;
                    zIndex: int;
                  }
                  interface Line extends CombineTypes<[_Line, RenderElement, java.lang.Object, Alignable<Line>]> {}
                  interface _Line$Builder$$static extends ClassLike {
                    new(draw2D: IDraw2D<any>): Line$Builder;
                  }
                  let Line$Builder: _Line$Builder$$static;
                  interface _Line$Builder {
                    alpha(alpha: int): Line$Builder;
                    color(color: int): Line$Builder;
                    color(color: int, alpha: int): Line$Builder;
                    color(r: int, g: int, b: int): Line$Builder;
                    color(r: int, g: int, b: int, a: int): Line$Builder;
                    _createElement(): Line;
                    _createElement(): RenderElement;
                    getAlpha(): int;
                    getColor(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): float;
                    getX1(): int;
                    getX2(): int;
                    getY1(): int;
                    getY2(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    moveTo(x: int, y: int): Line$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    pos(x1: int, y1: int, x2: int, y2: int): Line$Builder;
                    pos1(x1: int, y1: int): Line$Builder;
                    pos2(x2: int, y2: int): Line$Builder;
                    rotateCenter(rotateCenter: boolean): Line$Builder;
                    rotation(rotation: double): Line$Builder;
                    width(width: double): Line$Builder;
                    x1(x1: int): Line$Builder;
                    x2(x2: int): Line$Builder;
                    y1(y1: int): Line$Builder;
                    y2(y2: int): Line$Builder;
                    zIndex(zIndex: int): Line$Builder;
                    _alpha: int;
                    _color: int;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _width: float;
                    _x1: int;
                    _x2: int;
                    _y1: int;
                    _y2: int;
                    _zIndex: int;
                  }
                  interface Line$Builder extends CombineTypes<[_Line$Builder, RenderElementBuilder<Line>, Alignable<Line$Builder>]> {}
                  interface _Rect$$static extends ClassLike {
                    new(x1: int, y1: int, x2: int, y2: int, color: int, rotation: float, zIndex: int): Rect;
                    new(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int, rotation: float, zIndex: int): Rect;
                  }
                  let Rect: _Rect$$static;
                  interface _Rect {
                    getAlpha(): int;
                    getColor(): int;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): int;
                    getX1(): int;
                    getX2(): int;
                    getY1(): int;
                    getY2(): int;
                    getZIndex(): int;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Rect;
                    moveTo(a0: int, a1: int): Alignable;
                    setAlpha(alpha: int): Rect;
                    setColor(color: int): Rect;
                    setColor(color: int, alpha: int): Rect;
                    setHeight(height: int): Rect;
                    setParent(parent: IDraw2D<any>): Rect;
                    setPos(x1: int, y1: int, x2: int, y2: int): Rect;
                    setPos1(x1: int, y1: int): Rect;
                    setPos2(x2: int, y2: int): Rect;
                    setRotateCenter(rotateCenter: boolean): Rect;
                    setRotation(rotation: double): Rect;
                    setSize(width: int, height: int): Rect;
                    setWidth(width: int): Rect;
                    setX1(x1: int): Rect;
                    setX2(x2: int): Rect;
                    setY1(y1: int): Rect;
                    setY2(y2: int): Rect;
                    setZIndex(zIndex: int): Rect;
                    color: int;
                    parent: IDraw2D<any>;
                    rotateCenter: boolean;
                    rotation: float;
                    x1: int;
                    x2: int;
                    y1: int;
                    y2: int;
                    zIndex: int;
                  }
                  interface Rect extends CombineTypes<[_Rect, RenderElement, java.lang.Object, Alignable<Rect>]> {}
                  interface _Rect$Builder$$static extends ClassLike {
                    new(draw2D: IDraw2D<any>): Rect$Builder;
                  }
                  let Rect$Builder: _Rect$Builder$$static;
                  interface _Rect$Builder {
                    alpha(alpha: int): Rect$Builder;
                    color(color: int): Rect$Builder;
                    color(r: int, g: int, b: int): Rect$Builder;
                    color(r: int, g: int, b: int, a: int): Rect$Builder;
                    color(color: int, alpha: int): Rect$Builder;
                    createElement(): Rect;
                    createElement(): RenderElement;
                    getAlpha(): int;
                    getColor(): int;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getWidth(): int;
                    getX1(): int;
                    getX2(): int;
                    getY1(): int;
                    getY2(): int;
                    getZIndex(): int;
                    height(height: int): Rect$Builder;
                    isRotatingCenter(): boolean;
                    moveTo(x: int, y: int): Rect$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    pos(x1: int, y1: int, x2: int, y2: int): Rect$Builder;
                    pos1(x1: int, y1: int): Rect$Builder;
                    pos2(x2: int, y2: int): Rect$Builder;
                    rotateCenter(rotateCenter: boolean): Rect$Builder;
                    rotation(rotation: double): Rect$Builder;
                    size(width: int, height: int): Rect$Builder;
                    width(width: int): Rect$Builder;
                    x1(x1: int): Rect$Builder;
                    x2(x2: int): Rect$Builder;
                    y1(y1: int): Rect$Builder;
                    y2(y2: int): Rect$Builder;
                    zIndex(zIndex: int): Rect$Builder;
                    _alpha: int;
                    _color: int;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _x1: int;
                    _x2: int;
                    _y1: int;
                    _y2: int;
                    _zIndex: int;
                  }
                  interface Rect$Builder extends CombineTypes<[_Rect$Builder, Alignable<Rect$Builder>, RenderElementBuilder<Rect>]> {}
                  interface _RenderElement$$static extends ClassLike {
                    readonly mc: net.minecraft.class_310;
                  }
                  let RenderElement: _RenderElement$$static;
                  interface _RenderElement {
                    getZIndex(): int;
(): int;
                    render3D(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    setupMatrix(matrices: org.joml.Matrix3x2fStack, x: double, a2: double, y: float, a4: float, scale: double, rotation: double, width: boolean): void;
                  }
                  interface RenderElement extends CombineTypes<[_RenderElement, net.minecraft.class_4068, java.lang.Object]> {}
                  interface _RenderElementBuilder$$static<T> extends ClassLike {
                    _new(parent: IDraw2D<any>): RenderElementBuilder<T>;
                  }
                  let RenderElementBuilder: _RenderElementBuilder$$static<T>;
                  interface _RenderElementBuilder<T> {
                    build(): T;
                    buildAndAdd(): T;
                    _createElement(): T;
(): T;
                    _parent: IDraw2D<any>;
                  }
                  interface RenderElementBuilder<T> extends CombineTypes<[_RenderElementBuilder<T>, java.lang.Object]> {}
                  interface _Text$$static extends ClassLike {
                    new(text: string, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: float): Text;
                    new(text: api.helper.TextHelper, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: float): Text;
                  }
                  let Text: _Text$$static;
                  interface _Text {
                    getColor(): int;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): double;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getText(): api.helper.TextHelper;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    hasShadow(): boolean;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    moveTo(x: int, y: int): Text;
                    moveTo(a0: int, a1: int): Alignable;
                    render3D(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    setColor(color: int): Text;
                    setParent(parent: IDraw2D<any>): Text;
                    setPos(x: int, y: int): Text;
                    setRotateCenter(rotateCenter: boolean): Text;
                    setRotation(rotation: double): Text;
                    setScale(scale: double): Text;
                    setShadow(shadow: boolean): Text;
                    setText(text: string): Text;
                    setText(text: api.helper.TextHelper): Text;
                    setX(x: int): Text;
                    setY(y: int): Text;
                    setZIndex(zIndex: int): Text;
                    color: int;
                    parent: IDraw2D<any>;
                    rotateCenter: boolean;
                    rotation: float;
                    scale: double;
                    shadow: boolean;
                    text: net.minecraft.class_2561;
                    width: int;
                    x: int;
                    y: int;
                    zIndex: int;
                  }
                  interface Text extends CombineTypes<[_Text, RenderElement, java.lang.Object, Alignable<Text>]> {}
                  interface _Text$Builder$$static extends ClassLike {
                    new(draw2D: IDraw2D<any>): Text$Builder;
                  }
                  let Text$Builder: _Text$Builder$$static;
                  interface _Text$Builder {
                    color(color: int): Text$Builder;
                    color(r: int, g: int, b: int): Text$Builder;
                    color(r: int, g: int, b: int, a: int): Text$Builder;
                    createElement(): Text;
                    createElement(): RenderElement;
                    getColor(): int;
                    getHeight(): int;
                    getParentHeight(): int;
                    getParentWidth(): int;
                    getRotation(): float;
                    getScale(): double;
                    getScaledHeight(): int;
                    getScaledLeft(): int;
                    getScaledTop(): int;
                    getScaledWidth(): int;
                    getText(): api.helper.TextHelper;
                    getWidth(): int;
                    getX(): int;
                    getY(): int;
                    getZIndex(): int;
                    hasShadow(): boolean;
                    isRotatingCenter(): boolean;
                    moveTo(x: int, y: int): Text$Builder;
                    moveTo(a0: int, a1: int): Alignable;
                    pos(x: int, y: int): Text$Builder;
                    rotateCenter(rotateCenter: boolean): Text$Builder;
                    rotation(rotation: double): Text$Builder;
                    scale(scale: double): Text$Builder;
                    shadow(shadow: boolean): Text$Builder;
                    text(text: api.helper.TextHelper): Text$Builder;
                    text(text: TextBuilder): Text$Builder;
                    text(text: string): Text$Builder;
                    x(x: int): Text$Builder;
                    y(y: int): Text$Builder;
                    zIndex(zIndex: int): Text$Builder;
                    _color: int;
                    _rotateCenter: boolean;
                    _rotation: float;
                    _scale: double;
                    _shadow: boolean;
                    _text: net.minecraft.class_2561;
                    _x: int;
                    _y: int;
                    _zIndex: int;
                  }
                  interface Text$Builder extends CombineTypes<[_Text$Builder, Alignable<Text$Builder>, RenderElementBuilder<Text>]> {}
                }
                module components3d {
                  interface _Box$$static extends ClassLike {
                    _boxDepthTestFunction: java.lang.reflect.Field;
                    _lineDepthTestFunction: java.lang.reflect.Field;
                    _oldboxDepthTestFunction: com.mojang.blaze3d.platform.DepthTestFunction;
                    _oldlineDepthTestFunction: com.mojang.blaze3d.platform.DepthTestFunction;
                    new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: boolean, a9: boolean): Box;
                    new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: int, a9: int, z2: boolean, a11: boolean): Box;
                  }
                  let Box: _Box$$static;
                  interface _Box {
                    compareToSame(other: Box): int;
                    compareToSame(a0: RenderElement3D): int;
                    equals(o: any): boolean;
                    hashCode(): int;
                    render(matrixStack: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                    setAlpha(alpha: int): void;
                    setColor(color: int): void;
                    setColor(color: int, alpha: int): void;
                    setFill(fill: boolean): void;
                    setFillAlpha(alpha: int): void;
                    setFillColor(fillColor: int): void;
                    setFillColor(fillColor: int, alpha: int): void;
                    setPos(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): void;
                    setPosToBlock(pos: api.helper.world.BlockPosHelper): void;
                    setPosToBlock(x: int, y: int, z: int): void;
                    setPosToPoint(pos: jsmacros.api.math.Pos3D, radius: double): void;
                    setPosToPoint(x: double, a1: double, y: double, a3: double): void;
                    color: int;
                    cull: boolean;
                    fill: boolean;
                    fillColor: int;
                    pos: jsmacros.api.math.Vec3D;
                  }
                  interface Box extends CombineTypes<[_Box, RenderElement3D<Box>, java.lang.Object]> {}
                  interface _Box$Builder$$static extends ClassLike {
                    new(parent: Draw3D): Box$Builder;
                  }
                  let Box$Builder: _Box$Builder$$static;
                  interface _Box$Builder {
                    alpha(alpha: int): Box$Builder;
                    build(): Box;
                    buildAndAdd(): Box;
                    color(color: int): Box$Builder;
                    color(color: int, alpha: int): Box$Builder;
                    color(r: int, g: int, b: int): Box$Builder;
                    color(r: int, g: int, b: int, a: int): Box$Builder;
                    cull(cull: boolean): Box$Builder;
                    fill(fill: boolean): Box$Builder;
                    fillAlpha(fillAlpha: int): Box$Builder;
                    fillColor(fillColor: int): Box$Builder;
                    fillColor(fillColor: int, alpha: int): Box$Builder;
                    fillColor(r: int, g: int, b: int): Box$Builder;
                    fillColor(r: int, g: int, b: int, a: int): Box$Builder;
                    forBlock(x: int, y: int, z: int): Box$Builder;
                    forBlock(pos: api.helper.world.BlockPosHelper): Box$Builder;
                    getAlpha(): int;
                    getColor(): int;
                    getFillAlpha(): int;
                    getFillColor(): int;
                    getPos1(): jsmacros.api.math.Pos3D;
                    getPos2(): jsmacros.api.math.Pos3D;
                    isCulled(): boolean;
                    isFilled(): boolean;
                    pos(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): Box$Builder;
                    pos(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper): Box$Builder;
                    pos(pos1: jsmacros.api.math.Pos3D, pos2: jsmacros.api.math.Pos3D): Box$Builder;
                    pos1(pos1: jsmacros.api.math.Pos3D): Box$Builder;
                    pos1(pos1: api.helper.world.BlockPosHelper): Box$Builder;
                    pos1(x1: double, a1: double, y1: double): Box$Builder;
                    pos2(pos2: jsmacros.api.math.Pos3D): Box$Builder;
                    pos2(pos2: api.helper.world.BlockPosHelper): Box$Builder;
                    pos2(x2: double, a1: double, y2: double): Box$Builder;
                    _alpha: int;
                    _color: int;
                    _cull: boolean;
                    _fill: boolean;
                    _fillAlpha: int;
                    _fillColor: int;
                    _parent: Draw3D;
                    _pos1: jsmacros.api.math.Pos3D;
                    _pos2: jsmacros.api.math.Pos3D;
                  }
                  interface Box$Builder extends CombineTypes<[_Box$Builder, java.lang.Object]> {}
                  interface _EntityTraceLine$$static extends ClassLike {
                    dirty: boolean;
                    new(entity: api.helper.world.entity.EntityHelper<any>, color: int, yOffset: double): EntityTraceLine;
                    new(entity: api.helper.world.entity.EntityHelper<any>, color: int, alpha: int, yOffset: double): EntityTraceLine;
                  }
                  let EntityTraceLine: _EntityTraceLine$$static;
                  interface _EntityTraceLine {
                    render(matrixStack: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                    setEntity(entity: api.helper.world.entity.EntityHelper<any>): EntityTraceLine;
                    setYOffset(yOffset: double): EntityTraceLine;
                    entity: net.minecraft.class_1297;
                    shouldRemove: boolean;
                    yOffset: double;
                  }
                  interface EntityTraceLine extends CombineTypes<[_EntityTraceLine, xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.TraceLine]> {}
                  interface _EntityTraceLine$Builder$$static extends ClassLike {
                    new(parent: Draw3D): EntityTraceLine$Builder;
                  }
                  let EntityTraceLine$Builder: _EntityTraceLine$Builder$$static;
                  interface _EntityTraceLine$Builder {
                    alpha(alpha: int): EntityTraceLine$Builder;
                    build(entity: api.helper.world.entity.EntityHelper<any>): EntityTraceLine;
                    build(): EntityTraceLine;
                    buildAndAdd(entity: api.helper.world.entity.EntityHelper<any>): EntityTraceLine;
                    buildAndAdd(): EntityTraceLine;
                    color(color: int): EntityTraceLine$Builder;
                    color(color: int, alpha: int): EntityTraceLine$Builder;
                    color(r: int, g: int, b: int): EntityTraceLine$Builder;
                    color(r: int, g: int, b: int, a: int): EntityTraceLine$Builder;
                    entity(entity: api.helper.world.entity.EntityHelper<any>): EntityTraceLine$Builder;
                    getAlpha(): int;
                    getColor(): int;
                    getEntity(): api.helper.world.entity.EntityHelper<any>;
                    getYOffset(): double;
                    yOffset(yOffset: double): EntityTraceLine$Builder;
                    _alpha: int;
                    _color: int;
                    _entity: api.helper.world.entity.EntityHelper<any>;
                    _parent: Draw3D;
                    _yOffset: double;
                  }
                  interface EntityTraceLine$Builder extends CombineTypes<[_EntityTraceLine$Builder, java.lang.Object]> {}
                  interface _Line3D$$static extends ClassLike {
                    _lineDepthTestFunction: java.lang.reflect.Field;
                    _oldlineDepthTestFunction: com.mojang.blaze3d.platform.DepthTestFunction;
                    new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: boolean): Line3D;
                    new(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: boolean): Line3D;
                  }
                  let Line3D: _Line3D$$static;
                  interface _Line3D {
                    compareToSame(o: Line3D): int;
                    compareToSame(a0: RenderElement3D): int;
                    equals(o: any): boolean;
                    hashCode(): int;
                    render(matrixStack: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                    setAlpha(alpha: int): void;
                    setColor(color: int): void;
                    setColor(color: int, alpha: int): void;
                    setPos(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): void;
                    color: int;
                    cull: boolean;
                    pos: jsmacros.api.math.Vec3D;
                  }
                  interface Line3D extends CombineTypes<[_Line3D, java.lang.Object, RenderElement3D<Line3D>]> {}
                  interface _Line3D$Builder$$static extends ClassLike {
                    new(parent: Draw3D): Line3D$Builder;
                  }
                  let Line3D$Builder: _Line3D$Builder$$static;
                  interface _Line3D$Builder {
                    alpha(alpha: int): Line3D$Builder;
                    build(): Line3D;
                    buildAndAdd(): Line3D;
                    color(color: int): Line3D$Builder;
                    color(color: int, alpha: int): Line3D$Builder;
                    color(r: int, g: int, b: int): Line3D$Builder;
                    color(r: int, g: int, b: int, a: int): Line3D$Builder;
                    cull(cull: boolean): Line3D$Builder;
                    getAlpha(): int;
                    getColor(): int;
                    getPos1(): jsmacros.api.math.Pos3D;
                    getPos2(): jsmacros.api.math.Pos3D;
                    isCulled(): boolean;
                    pos(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int): Line3D$Builder;
                    pos(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper): Line3D$Builder;
                    pos(pos1: jsmacros.api.math.Pos3D, pos2: jsmacros.api.math.Pos3D): Line3D$Builder;
                    pos1(pos1: jsmacros.api.math.Pos3D): Line3D$Builder;
                    pos1(pos1: api.helper.world.BlockPosHelper): Line3D$Builder;
                    pos1(x1: double, a1: double, y1: double): Line3D$Builder;
                    pos2(pos2: jsmacros.api.math.Pos3D): Line3D$Builder;
                    pos2(pos2: api.helper.world.BlockPosHelper): Line3D$Builder;
                    pos2(x2: int, y2: int, z2: int): Line3D$Builder;
                    _alpha: int;
                    _color: int;
                    _cull: boolean;
                    _parent: Draw3D;
                    _pos1: jsmacros.api.math.Pos3D;
                    _pos2: jsmacros.api.math.Pos3D;
                  }
                  interface Line3D$Builder extends CombineTypes<[_Line3D$Builder, java.lang.Object]> {}
                  interface _RenderElement3D$$static<T> extends ClassLike {
                  }
                  let RenderElement3D: _RenderElement3D$$static<T>;
                  interface _RenderElement3D<T> {
                    compareTo(o: RenderElement3D): int;
                    compareTo(a0: any): int;
                    compareToSame(a0: T): int;
                    render(a0: net.minecraft.class_4587, a1: net.minecraft.class_4597, a2: float): void;
                  }
                  interface RenderElement3D<T> extends CombineTypes<[_RenderElement3D<T>, java.lang.Object, java.lang.Comparable<RenderElement3D<any>>]> {}
                  interface _Surface$$static extends ClassLike {
                    _toEulerDegrees(quaternion: org.joml.Quaternionf): org.joml.Vector3f;
                    new(pos: jsmacros.api.math.Pos3D, rotations: jsmacros.api.math.Pos3D, sizes: jsmacros.api.math.Pos2D, minSubdivisions: int, renderBack: boolean, cull: boolean): Surface;
                  }
                  let Surface: _Surface$$static;
                  interface _Surface {
                    bindToEntity(boundEntity: api.helper.world.entity.EntityHelper<any>): Surface;
                    compareToSame(other: Surface): int;
                    compareToSame(a0: RenderElement3D): int;
                    doesRotateToPlayer(): boolean;
                    equals(o: any): boolean;
                    getBoundEntity(): api.helper.world.entity.EntityHelper<any>;
                    getBoundOffset(): jsmacros.api.math.Pos3D;
                    getHeight(): int;
                    getMinSubdivisions(): int;
                    getSizes(): jsmacros.api.math.Pos2D;
                    getWidth(): int;
                    getZIndex(): int;
                    hashCode(): int;
                    init(): void;
                    isRotatingCenter(): boolean;
                    method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                    render(matrices: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                    _renderDraw2D3D(drawContext: net.minecraft.class_332, element: render.components.Draw2DElement): void;
                    _renderElement3D(drawContext: net.minecraft.class_332, element: render.components.RenderElement): void;
                    _renderElements3D(drawContext: net.minecraft.class_332, iter: java.util.Iterator<render.components.RenderElement>): void;
                    setBoundOffset(boundOffset: jsmacros.api.math.Pos3D): Surface;
                    setBoundOffset(x: double, a1: double, y: double): Surface;
                    setMinSubdivisions(minSubdivisions: int): void;
                    setPos(pos: jsmacros.api.math.Pos3D): Surface;
                    setPos(pos: api.helper.world.BlockPosHelper): Surface;
                    setPos(x: double, a1: double, y: double): Surface;
                    setRotateCenter(rotateCenter: boolean): Surface;
                    setRotateToPlayer(rotateToPlayer: boolean): Surface;
                    setRotations(x: double, a1: double, y: double): void;
                    setSizes(x: double, a1: double): void;
                    boundEntity: api.helper.world.entity.EntityHelper<any>;
                    boundOffset: jsmacros.api.math.Pos3D;
                    cull: boolean;
                    _minSubdivisions: int;
                    readonly pos: jsmacros.api.math.Pos3D;
                    renderBack: boolean;
                    rotateCenter: boolean;
                    rotateToPlayer: boolean;
                    readonly rotations: jsmacros.api.math.Pos3D;
                    _scale: double;
                    _sizes: jsmacros.api.math.Pos2D;
                    zIndexScale: double;
                  }
                  interface Surface extends CombineTypes<[_Surface, render.components.RenderElement, Draw2D, RenderElement3D<Surface>]> {}
                  interface _Surface$Builder$$static extends ClassLike {
                    new(parent: Draw3D): Surface$Builder;
                  }
                  let Surface$Builder: _Surface$Builder$$static;
                  interface _Surface$Builder {
                    bindToEntity(boundEntity: api.helper.world.entity.EntityHelper<any>): Surface$Builder;
                    boundOffset(entityOffset: jsmacros.api.math.Pos3D): Surface$Builder;
                    boundOffset(x: double, a1: double, y: double): Surface$Builder;
                    build(): Surface;
                    buildAndAdd(): Surface;
                    cull(cull: boolean): Surface$Builder;
                    doesRotateToPlayer(): boolean;
                    getBoundEntity(): api.helper.world.entity.EntityHelper<any>;
                    getBoundOffset(): jsmacros.api.math.Pos3D;
                    getHeight(): double;
                    getMinSubdivisions(): int;
                    getPos(): jsmacros.api.math.Pos3D;
                    getWidth(): double;
                    getXRotation(): double;
                    getYRotation(): double;
                    getZIndexScale(): double;
                    getZRotation(): double;
                    height(height: double): Surface$Builder;
                    isCulled(): boolean;
                    isRotatingCenter(): boolean;
                    minSubdivisions(minSubdivisions: int): Surface$Builder;
                    pos(pos: jsmacros.api.math.Pos3D): Surface$Builder;
                    pos(pos: api.helper.world.BlockPosHelper): Surface$Builder;
                    pos(x: double, a1: double, y: double): Surface$Builder;
                    renderBack(renderBack: boolean): Surface$Builder;
                    rotateCenter(rotateCenter: boolean): Surface$Builder;
                    rotateToPlayer(rotateToPlayer: boolean): Surface$Builder;
                    rotation(xRot: double, a1: double, yRot: double): Surface$Builder;
                    shouldRenderBack(): boolean;
                    size(width: double, a1: double): Surface$Builder;
                    width(width: double): Surface$Builder;
                    xRotation(xRot: double): Surface$Builder;
                    yRotation(yRot: double): Surface$Builder;
                    zIndex(zIndexScale: double): Surface$Builder;
                    zRotation(zRot: double): Surface$Builder;
                    _boundEntity: api.helper.world.entity.EntityHelper<any>;
                    _boundOffset: jsmacros.api.math.Pos3D;
                    _cull: boolean;
                    _height: double;
                    _minSubdivisions: int;
                    _parent: Draw3D;
                    _pos: jsmacros.api.math.Pos3D;
                    _renderBack: boolean;
                    _rotateCenter: boolean;
                    _rotateToPlayer: boolean;
                    _width: double;
                    _xRot: double;
                    _yRot: double;
                    _zIndexScale: double;
                    _zRot: double;
                  }
                  interface Surface$Builder extends CombineTypes<[_Surface$Builder, java.lang.Object]> {}
                  interface _TraceLine$$static extends ClassLike {
                    new(x: double, a1: double, y: double, a3: int): TraceLine;
                    new(x: double, a1: double, y: double, a3: int, z: int): TraceLine;
                    new(pos: jsmacros.api.math.Pos3D, color: int): TraceLine;
                    new(pos: jsmacros.api.math.Pos3D, color: int, alpha: int): TraceLine;
                  }
                  let TraceLine: _TraceLine$$static;
                  interface _TraceLine {
                    compareToSame(other: TraceLine): int;
                    compareToSame(a0: RenderElement3D): int;
                    equals(o: any): boolean;
                    hashCode(): int;
                    render(matrixStack: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                    setAlpha(alpha: int): TraceLine;
                    setColor(color: int): TraceLine;
                    setColor(color: int, alpha: int): TraceLine;
                    setPos(x: double, a1: double, y: double): TraceLine;
                    setPos(pos: jsmacros.api.math.Pos3D): TraceLine;
                    _render: Line3D;
                  }
                  interface TraceLine extends CombineTypes<[_TraceLine, java.lang.Object, RenderElement3D<TraceLine>]> {}
                  interface _TraceLine$Builder$$static extends ClassLike {
                    new(parent: Draw3D): TraceLine$Builder;
                  }
                  let TraceLine$Builder: _TraceLine$Builder$$static;
                  interface _TraceLine$Builder {
                    alpha(alpha: int): TraceLine$Builder;
                    build(): TraceLine;
                    buildAndAdd(): TraceLine;
                    color(color: int): TraceLine$Builder;
                    color(color: int, alpha: int): TraceLine$Builder;
                    color(r: int, g: int, b: int): TraceLine$Builder;
                    color(r: int, g: int, b: int, a: int): TraceLine$Builder;
                    getAlpha(): int;
                    getColor(): int;
                    getPos(): jsmacros.api.math.Pos3D;
                    pos(pos: jsmacros.api.math.Pos3D): TraceLine$Builder;
                    pos(pos: api.helper.world.BlockPosHelper): TraceLine$Builder;
                    pos(x: int, y: int, z: int): TraceLine$Builder;
                    _alpha: int;
                    _color: int;
                    _parent: Draw3D;
                    _pos: jsmacros.api.math.Pos3D;
                  }
                  interface TraceLine$Builder extends CombineTypes<[_TraceLine$Builder, java.lang.Object]> {}
                }
                interface _Draw2D$$static extends ClassLike {
                  new(): Draw2D;
                }
                let Draw2D: _Draw2D$$static;
                interface _Draw2D {
                  addDraw2D(draw2D: Draw2D, x: int, y: int, width: int, height: int): render.components.Draw2DElement;
                  addDraw2D(draw2D: Draw2D, x: int, y: int, width: int, height: int, zIndex: int): render.components.Draw2DElement;
                  addImage(x: int, y: int, width: int, height: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int): render.components.Image;
                  addImage(x: int, y: int, width: int, height: int, zIndex: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int): render.components.Image;
                  addImage(x: int, y: int, width: int, height: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): render.components.Image;
                  addImage(x: int, y: int, width: int, height: int, zIndex: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): render.components.Image;
                  addImage(x: int, y: int, width: int, height: int, zIndex: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): render.components.Image;
                  addImage(x: int, y: int, width: int, height: int, zIndex: int, alpha: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): render.components.Image;
                  addItem(x: int, y: int, id: string): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, id: string): render.components.Item;
                  addItem(x: int, y: int, id: string, overlay: boolean): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, id: string, overlay: boolean): render.components.Item;
                  addItem(x: int, y: int, id: string, overlay: boolean, scale: double, a5: double): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, id: string, overlay: boolean, scale: double, a6: double): render.components.Item;
                  addItem(x: int, y: int, Item: api.helper.inventory.ItemStackHelper): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, item: api.helper.inventory.ItemStackHelper): render.components.Item;
                  addItem(x: int, y: int, Item: api.helper.inventory.ItemStackHelper, overlay: boolean): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, item: api.helper.inventory.ItemStackHelper, overlay: boolean): render.components.Item;
                  addItem(x: int, y: int, item: api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a5: double): render.components.Item;
                  addItem(x: int, y: int, zIndex: int, item: api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a6: double): render.components.Item;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int): render.components.Line;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int): render.components.Line;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int, width: double): render.components.Line;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int, width: double): render.components.Line;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int, width: double, a6: double): render.components.Line;
                  addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int, width: double, a7: double): render.components.Line;
                  addRect(x1: int, y1: int, x2: int, y2: int, color: int): render.components.Rect;
                  addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int): render.components.Rect;
                  addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int, rotation: double): render.components.Rect;
                  addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int, rotation: double, a7: int): render.components.Rect;
                  addText(text: string, x: int, y: int, color: int, shadow: boolean): render.components.Text;
                  addText(text: string, x: int, y: int, color: int, zIndex: int, shadow: boolean): render.components.Text;
                  addText(text: string, x: int, y: int, color: int, shadow: boolean, scale: double, a6: double): render.components.Text;
                  addText(text: string, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: double): render.components.Text;
                  addText(text: api.helper.TextHelper, x: int, y: int, color: int, shadow: boolean): render.components.Text;
                  addText(text: api.helper.TextHelper, x: int, y: int, color: int, zIndex: int, shadow: boolean): render.components.Text;
                  addText(text: api.helper.TextHelper, x: int, y: int, color: int, shadow: boolean, scale: double, a6: double): render.components.Text;
                  addText(text: api.helper.TextHelper, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: double): render.components.Text;
                  getDraw2Ds(): java.util.List<render.components.Draw2DElement>;
                  getElements(): java.util.List<render.components.RenderElement>;
                  getElementsByZIndex(): java.util.Iterator<render.components.RenderElement>;
                  getHeight(): int;
                  getImages(): java.util.List<render.components.Image>;
                  getItems(): java.util.List<render.components.Item>;
                  getLines(): java.util.List<render.components.Line>;
                  getRects(): java.util.List<render.components.Rect>;
                  getTexts(): java.util.List<render.components.Text>;
                  getWidth(): int;
                  getZIndex(): int;
                  _hasCyclicDependencies(draw2d: Draw2D): boolean;
                  init(): void;
                  isVisible(): boolean;
                  reAddElement<T>(e: T): T;
                  register(): Draw2D;
                  register(): any;
                  removeDraw2D(draw2D: render.components.Draw2DElement): Draw2D;
                  removeDraw2D(a0: render.components.Draw2DElement): any;
                  removeElement(e: render.components.RenderElement): Draw2D;
                  removeElement(a0: render.components.RenderElement): any;
                  removeImage(i: render.components.Image): Draw2D;
                  removeImage(a0: render.components.Image): any;
                  removeItem(i: render.components.Item): Draw2D;
                  removeItem(a0: render.components.Item): any;
                  removeLine(l: render.components.Line): Draw2D;
                  removeLine(a0: render.components.Line): any;
                  removeRect(r: render.components.Rect): Draw2D;
                  removeRect(a0: render.components.Rect): any;
                  removeText(t: render.components.Text): Draw2D;
                  removeText(a0: render.components.Text): any;
                  render(drawContext: net.minecraft.class_332): void;
                  setOnFailInit(catchInit: jsmacros.core.MethodWrapper<string,any,any,any>): Draw2D;
                  setOnFailInit(a0: jsmacros.core.MethodWrapper): any;
                  setOnInit(onInit: jsmacros.core.MethodWrapper<Draw2D,any,any,any>): Draw2D;
                  setOnInit(a0: jsmacros.core.MethodWrapper): any;
                  setVisible(visible: boolean): Draw2D;
                  setZIndex(zIndex: int): void;
                  unregister(): Draw2D;
                  unregister(): any;
                  catchInit: jsmacros.core.MethodWrapper<string,any,any,any>;
                  _elements: java.util.Set<components.RenderElement>;
                  heightSupplier: java.util.function.IntSupplier;
                  _mc: net.minecraft.class_310;
                  onInit: jsmacros.core.MethodWrapper<Draw2D,any,any,any>;
                  visible: boolean;
                  widthSupplier: java.util.function.IntSupplier;
                  zIndex: int;
                }
                interface Draw2D extends CombineTypes<[_Draw2D, jsmacros.core.classes.Registrable<Draw2D>, IDraw2D<Draw2D>, java.lang.Object]> {}
                interface _Draw3D$$static extends ClassLike {
                  new(): Draw3D;
                }
                let Draw3D: _Draw3D$$static;
                interface _Draw3D {
                  addBox(box: render.components3d.Box): void;
                  addBox(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: boolean): render.components3d.Box;
                  addBox(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: boolean, a9: boolean): render.components3d.Box;
                  addBox(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: int, a9: int, z2: boolean): render.components3d.Box;
                  addBox(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: int, a9: int, z2: boolean, a11: boolean): render.components3d.Box;
                  addDraw2D(x: double, a1: double, y: double): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double, a5: double): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double, a5: double, xRot: double, a7: double): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double, a5: double, xRot: double, a7: double, yRot: int): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double, a5: double, xRot: double, a7: double, yRot: int, a9: boolean): render.components3d.Surface;
                  addDraw2D(x: double, a1: double, y: double, a3: double, z: double, a5: double, xRot: double, a7: double, yRot: int, a9: boolean, zRot: boolean): render.components3d.Surface;
                  addEntityTraceLine(entity: api.helper.world.entity.EntityHelper<any>, color: int): render.components3d.EntityTraceLine;
                  addEntityTraceLine(entity: api.helper.world.entity.EntityHelper<any>, color: int, alpha: int): render.components3d.EntityTraceLine;
                  addEntityTraceLine(entity: api.helper.world.entity.EntityHelper<any>, color: int, alpha: int, yOffset: double): render.components3d.EntityTraceLine;
                  addLine(line: render.components3d.Line3D): void;
                  addLine(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int): render.components3d.Line3D;
                  addLine(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: boolean): render.components3d.Line3D;
                  addLine(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int): render.components3d.Line3D;
                  addLine(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: int, a7: int, y2: boolean): render.components3d.Line3D;
                  addPoint(point: jsmacros.api.math.Pos3D, radius: double, a2: int): render.components3d.Box;
                  addPoint(x: double, a1: double, y: double, a3: double, z: int): render.components3d.Box;
                  addPoint(x: double, a1: double, y: double, a3: double, z: int, a5: int, radius: boolean): render.components3d.Box;
                  addSurface(surface: render.components3d.Surface): void;
                  addTraceLine(line: render.components3d.TraceLine): void;
                  addTraceLine(x: double, a1: double, y: double, a3: int): render.components3d.TraceLine;
                  addTraceLine(x: double, a1: double, y: double, a3: int, z: int): render.components3d.TraceLine;
                  addTraceLine(pos: jsmacros.api.math.Pos3D, color: int): render.components3d.TraceLine;
                  addTraceLine(pos: jsmacros.api.math.Pos3D, color: int, alpha: int): render.components3d.TraceLine;
                  boxBuilder(): render.components3d.Box$Builder;
                  boxBuilder(pos: api.helper.world.BlockPosHelper): render.components3d.Box$Builder;
                  boxBuilder(x: int, y: int, z: int): render.components3d.Box$Builder;
                  clear(): void;
                  entityTraceLineBuilder(): render.components3d.EntityTraceLine$Builder;
                  getBoxes(): java.util.List<render.components3d.Box>;
                  getDraw2Ds(): java.util.List<render.components3d.Surface>;
                  getEntityTraceLines(): java.util.List<render.components3d.EntityTraceLine>;
                  getLines(): java.util.List<render.components3d.Line3D>;
                  getTraceLines(): java.util.List<render.components3d.TraceLine>;
                  lineBuilder(): render.components3d.Line3D$Builder;
                  reAddElement(element: render.components3d.RenderElement3D<any>): void;
                  register(): Draw3D;
                  register(): any;
                  removeBox(b: render.components3d.Box): Draw3D;
                  removeDraw2D(surface: render.components3d.Surface): void;
                  removeLine(l: render.components3d.Line3D): Draw3D;
                  removeTraceLine(traceLine: render.components3d.TraceLine): Draw3D;
                  render(poseStack: net.minecraft.class_4587, consumers: net.minecraft.class_4597, tickDelta: float): void;
                  surfaceBuilder(): render.components3d.Surface$Builder;
                  traceLineBuilder(): render.components3d.TraceLine$Builder;
                  unregister(): Draw3D;
                  unregister(): any;
                  _elements: java.util.List<components3d.RenderElement3D<any>>;
                }
                interface Draw3D extends CombineTypes<[_Draw3D, jsmacros.core.classes.Registrable<Draw3D>, java.lang.Object]> {}
                interface _IDraw2D$$static<T> extends ClassLike {
                }
                let IDraw2D: _IDraw2D$$static<T>;
                interface _IDraw2D<T> {
                  addDraw2D(a0: Draw2D, a1: int, a2: int, a3: int, a4: int): render.components.Draw2DElement;
                  addDraw2D(a0: Draw2D, a1: int, a2: int, a3: int, a4: int, a5: int): render.components.Draw2DElement;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: string, a5: int, a6: int, a7: int, a8: int, a9: int, a10: int): render.components.Image;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: int, a7: int, a8: int, a9: int, a10: int, a11: int): render.components.Image;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: string, a5: int, a6: int, a7: int, a8: int, a9: int, a10: int, a11: double): render.components.Image;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: int, a7: int, a8: int, a9: int, a10: int, a11: int, a12: double): render.components.Image;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: string, a7: int, a8: int, a9: int, a10: int, a11: int, a12: int, a13: double): render.components.Image;
                  addImage(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: int, a7: string, a8: int, a9: int, a10: int, a11: int, a12: int, a13: int, a14: double): render.components.Image;
                  addItem(a0: int, a1: int, a2: string): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: string): render.components.Item;
                  addItem(a0: int, a1: int, a2: string, a3: boolean): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: string, a4: boolean): render.components.Item;
                  addItem(a0: int, a1: int, a2: string, a3: boolean, a4: double, a5: double): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: string, a4: boolean, a5: double, a6: double): render.components.Item;
                  addItem(a0: int, a1: int, a2: api.helper.inventory.ItemStackHelper): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: api.helper.inventory.ItemStackHelper): render.components.Item;
                  addItem(a0: int, a1: int, a2: api.helper.inventory.ItemStackHelper, a3: boolean): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: api.helper.inventory.ItemStackHelper, a4: boolean): render.components.Item;
                  addItem(a0: int, a1: int, a2: api.helper.inventory.ItemStackHelper, a3: boolean, a4: double, a5: double): render.components.Item;
                  addItem(a0: int, a1: int, a2: int, a3: api.helper.inventory.ItemStackHelper, a4: boolean, a5: double, a6: double): render.components.Item;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int): render.components.Line;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int): render.components.Line;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int, a5: double): render.components.Line;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: double): render.components.Line;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int, a5: double, a6: double): render.components.Line;
                  addLine(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: double, a7: double): render.components.Line;
                  addRect(a0: int, a1: int, a2: int, a3: int, a4: int): render.components.Rect;
                  addRect(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int): render.components.Rect;
                  addRect(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: double): render.components.Rect;
                  addRect(a0: int, a1: int, a2: int, a3: int, a4: int, a5: int, a6: double, a7: int): render.components.Rect;
                  addText(a0: string, a1: int, a2: int, a3: int, a4: boolean): render.components.Text;
                  addText(a0: string, a1: int, a2: int, a3: int, a4: int, a5: boolean): render.components.Text;
                  addText(a0: string, a1: int, a2: int, a3: int, a4: boolean, a5: double, a6: double): render.components.Text;
                  addText(a0: string, a1: int, a2: int, a3: int, a4: int, a5: boolean, a6: double, a7: double): render.components.Text;
                  addText(a0: api.helper.TextHelper, a1: int, a2: int, a3: int, a4: boolean): render.components.Text;
                  addText(a0: api.helper.TextHelper, a1: int, a2: int, a3: int, a4: int, a5: boolean): render.components.Text;
                  addText(a0: api.helper.TextHelper, a1: int, a2: int, a3: int, a4: boolean, a5: double, a6: double): render.components.Text;
                  addText(a0: api.helper.TextHelper, a1: int, a2: int, a3: int, a4: int, a5: boolean, a6: double, a7: double): render.components.Text;
                  draw2DBuilder(draw2D: Draw2D): render.components.Draw2DElement$Builder;
                  getDraw2Ds(): java.util.List<render.components.Draw2DElement>;
                  getElements(): java.util.List<render.components.RenderElement>;
                  getHeight(): int;
                  getImages(): java.util.List<render.components.Image>;
                  getItems(): java.util.List<render.components.Item>;
                  getLines(): java.util.List<render.components.Line>;
                  getRects(): java.util.List<render.components.Rect>;
                  getTexts(): java.util.List<render.components.Text>;
                  getWidth(): int;
                  getZIndex(): int;
                  imageBuilder(): render.components.Image$Builder;
                  imageBuilder(id: string): render.components.Image$Builder;
                  itemBuilder(): render.components.Item$Builder;
                  itemBuilder(item: api.helper.inventory.ItemStackHelper): render.components.Item$Builder;
                  lineBuilder(): render.components.Line$Builder;
                  lineBuilder(x1: int, y1: int, x2: int, y2: int): render.components.Line$Builder;
                  reAddElement<T>(a0: T): T;
                  rectBuilder(): render.components.Rect$Builder;
                  rectBuilder(x: int, y: int, width: int, height: int): render.components.Rect$Builder;
                  removeDraw2D(a0: render.components.Draw2DElement): T;
                  removeElement(a0: render.components.RenderElement): T;
                  removeImage(a0: render.components.Image): T;
                  removeItem(a0: render.components.Item): T;
                  removeLine(a0: render.components.Line): T;
                  removeRect(a0: render.components.Rect): T;
                  removeText(a0: render.components.Text): T;
                  render(a0: net.minecraft.class_332): void;
                  setOnFailInit(a0: jsmacros.core.MethodWrapper<string,any,any,any>): T;
                  setOnInit(a0: jsmacros.core.MethodWrapper<T,any,any,any>): T;
                  setZIndex(a0: int): void;
                  textBuilder(): render.components.Text$Builder;
                  textBuilder(text: string): render.components.Text$Builder;
                  textBuilder(text: api.helper.TextHelper): render.components.Text$Builder;
                }
                interface IDraw2D<T> extends CombineTypes<[_IDraw2D<T>, java.lang.Object]> {}
                interface _IScreen$$static extends ClassLike {
                }
                let IScreen: _IScreen$$static;
                interface _IScreen {
                  addButton(a0: int, a1: int, a2: int, a3: int, a4: string, a5: jsmacros.core.MethodWrapper<api.helper.screen.ClickableWidgetHelper<any,any>,IScreen,any,any>): api.helper.screen.ClickableWidgetHelper<any,any>;
                  addButton(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: jsmacros.core.MethodWrapper<api.helper.screen.ClickableWidgetHelper<any,any>,IScreen,any,any>): api.helper.screen.ClickableWidgetHelper<any,any>;
                  addCheckbox(a0: int, a1: int, a2: int, a3: int, a4: string, a5: boolean, a6: boolean, a7: jsmacros.core.MethodWrapper<api.helper.screen.CheckBoxWidgetHelper,IScreen,any,any>): api.helper.screen.CheckBoxWidgetHelper;
                  addCheckbox(a0: int, a1: int, a2: int, a3: int, a4: string, a5: boolean, a6: jsmacros.core.MethodWrapper<api.helper.screen.CheckBoxWidgetHelper,IScreen,any,any>): api.helper.screen.CheckBoxWidgetHelper;
                  addCheckbox(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: boolean, a7: jsmacros.core.MethodWrapper<api.helper.screen.CheckBoxWidgetHelper,IScreen,any,any>): api.helper.screen.CheckBoxWidgetHelper;
                  addCheckbox(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: boolean, a7: boolean, a8: jsmacros.core.MethodWrapper<api.helper.screen.CheckBoxWidgetHelper,IScreen,any,any>): api.helper.screen.CheckBoxWidgetHelper;
                  addCyclingButton(a0: int, a1: int, a2: int, a3: int, a4: string[], a5: string, a6: jsmacros.core.MethodWrapper<api.helper.screen.CyclingButtonWidgetHelper<any>,IScreen,any,any>): api.helper.screen.CyclingButtonWidgetHelper<any>;
                  addCyclingButton(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string[], a6: string, a7: jsmacros.core.MethodWrapper<api.helper.screen.CyclingButtonWidgetHelper<any>,IScreen,any,any>): api.helper.screen.CyclingButtonWidgetHelper<any>;
                  addCyclingButton(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string[], a6: string[], a7: string, a8: string, a9: jsmacros.core.MethodWrapper<api.helper.screen.CyclingButtonWidgetHelper<any>,IScreen,any,any>): api.helper.screen.CyclingButtonWidgetHelper<any>;
                  addCyclingButton(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string[], a6: string[], a7: string, a8: string, a9: jsmacros.core.MethodWrapper<any,any,boolean,any>, a10: jsmacros.core.MethodWrapper<api.helper.screen.CyclingButtonWidgetHelper<any>,IScreen,any,any>): api.helper.screen.CyclingButtonWidgetHelper<any>;
                  addLockButton(a0: int, a1: int, a2: jsmacros.core.MethodWrapper<api.helper.screen.LockButtonWidgetHelper,IScreen,any,any>): api.helper.screen.LockButtonWidgetHelper;
                  addLockButton(a0: int, a1: int, a2: int, a3: jsmacros.core.MethodWrapper<api.helper.screen.LockButtonWidgetHelper,IScreen,any,any>): api.helper.screen.LockButtonWidgetHelper;
                  addSlider(a0: int, a1: int, a2: int, a3: int, a4: string, a5: double, a6: int, a7: jsmacros.core.MethodWrapper<api.helper.screen.SliderWidgetHelper,IScreen,any,any>): api.helper.screen.SliderWidgetHelper;
                  addSlider(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: double, a7: int, a8: jsmacros.core.MethodWrapper<api.helper.screen.SliderWidgetHelper,IScreen,any,any>): api.helper.screen.SliderWidgetHelper;
                  addSlider(a0: int, a1: int, a2: int, a3: int, a4: string, a5: double, a6: jsmacros.core.MethodWrapper<api.helper.screen.SliderWidgetHelper,IScreen,any,any>): api.helper.screen.SliderWidgetHelper;
                  addSlider(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: double, a7: jsmacros.core.MethodWrapper<api.helper.screen.SliderWidgetHelper,IScreen,any,any>): api.helper.screen.SliderWidgetHelper;
                  addTextInput(a0: int, a1: int, a2: int, a3: int, a4: string, a5: jsmacros.core.MethodWrapper<string,IScreen,any,any>): api.helper.screen.TextFieldWidgetHelper;
                  addTextInput(a0: int, a1: int, a2: int, a3: int, a4: int, a5: string, a6: jsmacros.core.MethodWrapper<string,IScreen,any,any>): api.helper.screen.TextFieldWidgetHelper;
                  buttonBuilder(): api.helper.screen.ButtonWidgetHelper$ButtonBuilder;
                  checkBoxBuilder(): api.helper.screen.CheckBoxWidgetHelper$CheckBoxBuilder;
                  checkBoxBuilder(a0: boolean): api.helper.screen.CheckBoxWidgetHelper$CheckBoxBuilder;
                  close(): void;
                  cyclicButtonBuilder(a0: jsmacros.core.MethodWrapper<any,any,api.helper.TextHelper,any>): api.helper.screen.CyclingButtonWidgetHelper$CyclicButtonBuilder<any>;
                  getButtonWidgets(): java.util.List<api.helper.screen.ClickableWidgetHelper<any,any>>;
                  getOnClose(): jsmacros.core.MethodWrapper<IScreen,any,any,any>;
                  getScreenClassName(): string;
                  getTextFields(): java.util.List<api.helper.screen.TextFieldWidgetHelper>;
                  getTitleText(): api.helper.TextHelper;
                  isAltDown(): boolean;
                  isCtrlDown(): boolean;
                  isShiftDown(): boolean;
                  lockButtonBuilder(): api.helper.screen.LockButtonWidgetHelper$LockButtonBuilder;
                  lockButtonBuilder(a0: boolean): api.helper.screen.LockButtonWidgetHelper$LockButtonBuilder;
                  reloadScreen(): IScreen;
                  removeButton(a0: api.helper.screen.ClickableWidgetHelper<any,any>): IScreen;
                  removeTextInput(a0: api.helper.screen.TextFieldWidgetHelper): IScreen;
                  setOnCharTyped(a0: jsmacros.core.MethodWrapper<IScreen$character,int,any,any>): IScreen;
                  setOnClose(a0: jsmacros.core.MethodWrapper<IScreen,any,any,any>): IScreen;
                  setOnKeyPressed(a0: jsmacros.core.MethodWrapper<int,int,any,any>): IScreen;
                  setOnMouseDown(a0: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>): IScreen;
                  setOnMouseDrag(a0: jsmacros.core.MethodWrapper<jsmacros.api.math.Vec2D,int,any,any>): IScreen;
                  setOnMouseUp(a0: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>): IScreen;
                  setOnScroll(a0: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,jsmacros.api.math.Pos2D,any,any>): IScreen;
                  sliderBuilder(): api.helper.screen.SliderWidgetHelper$SliderBuilder;
                  textFieldBuilder(): api.helper.screen.TextFieldWidgetHelper$TextFieldBuilder;
                  texturedButtonBuilder(): api.helper.screen.ButtonWidgetHelper$TexturedButtonBuilder;
                }
                interface IScreen extends CombineTypes<[_IScreen, IDraw2D<IScreen>, java.lang.Object]> {}
                interface _ScriptScreen$$static extends ClassLike {
                  new(title: string, dirt: boolean): ScriptScreen;
                }
                let ScriptScreen: _ScriptScreen$$static;
                interface _ScriptScreen {
                  method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  method_25419(): void;
                  method_25421(): boolean;
                  method_25422(): boolean;
                  _method_25426(): void;
                  setOnRender(onRender: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos3D,net.minecraft.class_332,any,any>): void;
                  setParent(parent: IScreen): void;
                  _bgStyle: int;
                  drawTitle: boolean;
                  _onRender: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos3D,net.minecraft.class_332,any,any>;
                  shouldCloseOnEsc: boolean;
                  shouldPause: boolean;
                }
                interface ScriptScreen extends CombineTypes<[_ScriptScreen, xyz.wagyourtail.wagyourgui.BaseScreen]> {}
              }
              module worldscanner {
                module filter {
                  module api {
                    interface _IAdvancedFilter$$static<T> extends ClassLike {
                    }
                    let IAdvancedFilter: _IAdvancedFilter$$static<T>;
                    interface _IAdvancedFilter<T> {
                      and(a0: IFilter<T>): IAdvancedFilter<T>;
                      not(): IAdvancedFilter<T>;
                      or(a0: IFilter<T>): IAdvancedFilter<T>;
                      xor(a0: IFilter<T>): IAdvancedFilter<T>;
                    }
                    interface IAdvancedFilter<T> extends CombineTypes<[_IAdvancedFilter<T>, java.lang.Object, IFilter<T>]> {}
                    interface _ICompare$$static<T> extends ClassLike {
                    }
                    let ICompare: _ICompare$$static<T>;
                    interface _ICompare<T> {
                      compare(a0: T, a1: T): boolean;
(a0: T, a1: T): boolean;
                    }
                    interface ICompare<T> extends CombineTypes<[_ICompare<T>, java.lang.Object]> {}
                    interface _IFilter$$static<T> extends ClassLike {
                    }
                    let IFilter: _IFilter$$static<T>;
                    interface _IFilter<T> {
                      apply(a0: T): boolean;
(a0: T): boolean;
                      apply(a0: any): any;
                    }
                    interface IFilter<T> extends CombineTypes<[_IFilter<T>, java.util.function.Function<T,boolean>, java.lang.Object]> {}
                  }
                  module compare {
                    interface _BooleanCompareFilter$$static extends ClassLike {
                      new(compareTo: boolean): BooleanCompareFilter;
                    }
                    let BooleanCompareFilter: _BooleanCompareFilter$$static;
                    interface _BooleanCompareFilter {
                      apply(bool: boolean): boolean;
                      apply(a0: any): boolean;
                      apply(a0: any): any;
                      _compareTo: boolean;
                    }
                    interface BooleanCompareFilter extends CombineTypes<[_BooleanCompareFilter, filter.api.IFilter<boolean>, java.lang.Object]> {}
                    interface _CharCompareFilter$$static extends ClassLike {
                      new(compareTo: char): CharCompareFilter;
                    }
                    let CharCompareFilter: _CharCompareFilter$$static;
                    interface _CharCompareFilter {
                      apply(character: CharCompareFilter$character): boolean;
                      apply(a0: any): boolean;
                      apply(a0: any): any;
                      _compareTo: char;
                    }
                    interface CharCompareFilter extends CombineTypes<[_CharCompareFilter, java.lang.Object, filter.api.IFilter<compare$character>]> {}
                    interface _NumberCompareFilter$$static extends ClassLike {
                      _EPSILON: double;
                      new(operation: string, compareTo: any): NumberCompareFilter;
                    }
                    let NumberCompareFilter: _NumberCompareFilter$$static;
                    interface _NumberCompareFilter {
                      apply(t: number): boolean;
                      apply(a0: any): boolean;
                      apply(a0: any): any;
                      _applyOperation(num: number): boolean;
                      _compareByte(num: number, compareTo: number): boolean;
                      _compareDouble(num: number, compareTo: number): boolean;
                      _compareFloat(num: number, compareTo: number): boolean;
                      _compareInt(num: number, compareTo: number): boolean;
                      _compareLong(num: number, compareTo: number): boolean;
                      _compareShort(num: number, compareTo: number): boolean;
                      _getNumberType(compareTo: any): string;
                      _compareTo: number;
                      _numberType: string;
                      _operation: string;
                    }
                    interface NumberCompareFilter extends CombineTypes<[_NumberCompareFilter, filter.api.IFilter<number>, java.lang.Object]> {}
                    interface _StringCompareFilter$$static extends ClassLike {
                      new(operation: string, compareTo: string): StringCompareFilter;
                    }
                    let StringCompareFilter: _StringCompareFilter$$static;
                    interface _StringCompareFilter {
                      apply(val: string): boolean;
                      apply(a0: any): boolean;
                      apply(a0: any): any;
                      _compareTo: string;
                      _filter: filter.api.ICompare<string>;
                    }
                    interface StringCompareFilter extends CombineTypes<[_StringCompareFilter, java.lang.Object, filter.api.IFilter<string>]> {}
                    interface _StringCompareFilter$FilterMethod$$static extends ClassLike {
                      valueOf(name: string): StringCompareFilter$FilterMethod;
                      values(): StringCompareFilter$FilterMethod[];
                      readonly CONTAINS: StringCompareFilter$FilterMethod;
                      readonly ENDS_WITH: StringCompareFilter$FilterMethod;
                      readonly EQUALS: StringCompareFilter$FilterMethod;
                      readonly MATCHES: StringCompareFilter$FilterMethod;
                      readonly STARTS_WITH: StringCompareFilter$FilterMethod;
                    }
                    let StringCompareFilter$FilterMethod: _StringCompareFilter$FilterMethod$$static;
                    interface _StringCompareFilter$FilterMethod {
                      getMethod(): filter.api.ICompare<string>;
                      _method: filter.api.ICompare<string>;
                    }
                    interface StringCompareFilter$FilterMethod extends CombineTypes<[_StringCompareFilter$FilterMethod]> {}
                  }
                  module impl {
                    interface _BlockFilter$$static extends ClassLike {
                      _METHOD_LOOKUP: java.util.Map<string,java.lang.reflect.Method>;
                      new(methodName: string, methodArgs: any[], filterArgs: any[]): BlockFilter;
                    }
                    let BlockFilter: _BlockFilter$$static;
                    interface _BlockFilter {
                    }
                    interface BlockFilter extends CombineTypes<[_BlockFilter, ClassWrapperFilter<api.helper.world.BlockHelper>]> {}
                    interface _BlockStateFilter$$static extends ClassLike {
                      _METHOD_LOOKUP: java.util.Map<string,java.lang.reflect.Method>;
                      new(methodName: string, methodArgs: any[], filterArgs: any[]): BlockStateFilter;
                    }
                    let BlockStateFilter: _BlockStateFilter$$static;
                    interface _BlockStateFilter {
                    }
                    interface BlockStateFilter extends CombineTypes<[_BlockStateFilter, ClassWrapperFilter<api.helper.world.BlockStateHelper>]> {}
                    interface _StringifyFilter$$static<T> extends ClassLike {
                      new(operation: string): StringifyFilter<T>;
                    }
                    let StringifyFilter: _StringifyFilter$$static<T>;
                    interface _StringifyFilter<T> {
                      addOption(toAdd: string): StringifyFilter;
                      addOption(toAdd: string[]): StringifyFilter;
                      addOption(...toAdd: string[]): StringifyFilter;
                      apply(obj: any): boolean;
                      apply(a0: any): any;
                      removeOption(toRemove: string): StringifyFilter;
                      removeOption(toRemove: string[]): StringifyFilter;
                      removeOption(...toRemove: string[]): StringifyFilter;
                      _filter: filter.api.ICompare<string>;
                      _filterObjects: java.util.Set<string>;
                    }
                    interface StringifyFilter<T> extends CombineTypes<[_StringifyFilter<T>, BasicFilter<T>]> {}
                  }
                  module logical {
                    interface _AndFilter$$static<T> extends ClassLike {
                      new(filterOne: filter.api.IFilter<T>, filterTwo: filter.api.IFilter<T>): AndFilter<T>;
                    }
                    let AndFilter: _AndFilter$$static<T>;
                    interface _AndFilter<T> {
                      apply(obj: T): boolean;
                      apply(a0: any): any;
                      getFilterOne(): filter.api.IFilter<T>;
                      getFilterTwo(): filter.api.IFilter<T>;
                      _filterOne: filter.api.IFilter<T>;
                      _filterTwo: filter.api.IFilter<T>;
                    }
                    interface AndFilter<T> extends CombineTypes<[_AndFilter<T>, BasicFilter<T>]> {}
                    interface _NotFilter$$static<T> extends ClassLike {
                      new(filter: filter.api.IFilter<T>): NotFilter<T>;
                    }
                    let NotFilter: _NotFilter$$static<T>;
                    interface _NotFilter<T> {
                      apply(obj: T): boolean;
                      apply(a0: any): any;
                      getFilter(): filter.api.IFilter<T>;
                      _filter: filter.api.IFilter<T>;
                    }
                    interface NotFilter<T> extends CombineTypes<[_NotFilter<T>, BasicFilter<T>]> {}
                    interface _OrFilter$$static<T> extends ClassLike {
                      new(filterOne: filter.api.IFilter<T>, filterTwo: filter.api.IFilter<T>): OrFilter<T>;
                    }
                    let OrFilter: _OrFilter$$static<T>;
                    interface _OrFilter<T> {
                      apply(obj: T): boolean;
                      apply(a0: any): any;
                      getFilterOne(): filter.api.IFilter<T>;
                      getFilterTwo(): filter.api.IFilter<T>;
                      _filterOne: filter.api.IFilter<T>;
                      _filterTwo: filter.api.IFilter<T>;
                    }
                    interface OrFilter<T> extends CombineTypes<[_OrFilter<T>, BasicFilter<T>]> {}
                    interface _XorFilter$$static<T> extends ClassLike {
                      new(filterOne: filter.api.IFilter<T>, filterTwo: filter.api.IFilter<T>): XorFilter<T>;
                    }
                    let XorFilter: _XorFilter$$static<T>;
                    interface _XorFilter<T> {
                      apply(obj: T): boolean;
                      apply(a0: any): any;
                      getFilterOne(): filter.api.IFilter<T>;
                      getFilterTwo(): filter.api.IFilter<T>;
                      _filterOne: filter.api.IFilter<T>;
                      _filterTwo: filter.api.IFilter<T>;
                    }
                    interface XorFilter<T> extends CombineTypes<[_XorFilter<T>, BasicFilter<T>]> {}
                  }
                  interface _BasicFilter$$static<T> extends ClassLike {
                    new(): BasicFilter<T>;
                  }
                  let BasicFilter: _BasicFilter$$static<T>;
                  interface _BasicFilter<T> {
                    and(filter: filter.api.IFilter<T>): filter.api.IAdvancedFilter<T>;
                    not(): filter.api.IAdvancedFilter<T>;
                    or(filter: filter.api.IFilter<T>): filter.api.IAdvancedFilter<T>;
                    xor(filter: filter.api.IFilter<T>): filter.api.IAdvancedFilter<T>;
                  }
                  interface BasicFilter<T> extends CombineTypes<[_BasicFilter<T>, java.lang.Object, api.IAdvancedFilter<T>]> {}
                  interface _ClassWrapperFilter$$static<T> extends ClassLike {
                    getFilter(clazz: java.lang.Class<any>, methodName: string, args: any[]): filter.api.IFilter<any>;
                    getFilter(clazz: java.lang.Class<any>, methodName: string, ...args: any[]): filter.api.IFilter<any>;
                    _getFilter(returnType: java.lang.Class<any>, args: any[]): filter.api.IFilter<any>;
                    _getFilter(returnType: java.lang.Class<any>, ...args: any[]): filter.api.IFilter<any>;
                    _getPublicNoParameterMethods(clazz: java.lang.Class<any>): java.util.Map<string,java.lang.reflect.Method>;
                    _new(methodName: string, methods: java.util.Map<string,java.lang.reflect.Method>, methodArgs: any[], filterArgs: any[]): ClassWrapperFilter<T>;
                  }
                  let ClassWrapperFilter: _ClassWrapperFilter$$static<T>;
                  interface _ClassWrapperFilter<T> {
                    apply(t: T): boolean;
                    apply(a0: any): any;
                    _filter: api.IFilter<any>;
                    _method: java.lang.reflect.Method;
                    _methodArgs: any[];
                    _methodName: string;
                  }
                  interface ClassWrapperFilter<T> extends CombineTypes<[_ClassWrapperFilter<T>, BasicFilter<T>]> {}
                  interface _GroupFilter$$static<T> extends ClassLike {
                    _new(): GroupFilter<T>;
                  }
                  let GroupFilter: _GroupFilter$$static<T>;
                  interface _GroupFilter<T> {
                    add(filter: filter.api.IFilter<T>): GroupFilter<T>;
                    add(filters: java.util.List<filter.api.IFilter<T>>): GroupFilter<T>;
                    getFilters(): java.util.List<filter.api.IFilter<T>>;
                    remove(filter: filter.api.IFilter<T>): GroupFilter<T>;
                    remove(filters: java.util.List<filter.api.IFilter<T>>): GroupFilter<T>;
                    _filters: java.util.List<api.IFilter<T>>;
                  }
                  interface GroupFilter<T> extends CombineTypes<[_GroupFilter<T>, api.IFilter<T>, java.lang.Object]> {}
                  interface _GroupFilter$AllMatchFilter$$static<T> extends ClassLike {
                    new(): GroupFilter$AllMatchFilter<T>;
                  }
                  let GroupFilter$AllMatchFilter: _GroupFilter$AllMatchFilter$$static<T>;
                  interface _GroupFilter$AllMatchFilter<T> {
                    apply(t: T): boolean;
                    apply(a0: any): any;
                  }
                  interface GroupFilter$AllMatchFilter<T> extends CombineTypes<[_GroupFilter$AllMatchFilter<T>, GroupFilter<T>]> {}
                  interface _GroupFilter$AnyMatchFilter$$static<T> extends ClassLike {
                    new(): GroupFilter$AnyMatchFilter<T>;
                  }
                  let GroupFilter$AnyMatchFilter: _GroupFilter$AnyMatchFilter$$static<T>;
                  interface _GroupFilter$AnyMatchFilter<T> {
                    apply(t: T): boolean;
                    apply(a0: any): any;
                  }
                  interface GroupFilter$AnyMatchFilter<T> extends CombineTypes<[_GroupFilter$AnyMatchFilter<T>, GroupFilter<T>]> {}
                  interface _GroupFilter$CountMatchFilter$$static<T> extends ClassLike {
                    new(operation: string, compareTo: long): GroupFilter$CountMatchFilter<T>;
                  }
                  let GroupFilter$CountMatchFilter: _GroupFilter$CountMatchFilter$$static<T>;
                  interface _GroupFilter$CountMatchFilter<T> {
                    apply(t: T): boolean;
                    apply(a0: any): any;
                    _filter: api.IFilter<number>;
                  }
                  interface GroupFilter$CountMatchFilter<T> extends CombineTypes<[_GroupFilter$CountMatchFilter<T>, GroupFilter<T>]> {}
                  interface _GroupFilter$NoneMatchFilter$$static<T> extends ClassLike {
                    new(): GroupFilter$NoneMatchFilter<T>;
                  }
                  let GroupFilter$NoneMatchFilter: _GroupFilter$NoneMatchFilter$$static<T>;
                  interface _GroupFilter$NoneMatchFilter<T> {
                    apply(t: T): boolean;
                    apply(a0: any): any;
                  }
                  interface GroupFilter$NoneMatchFilter<T> extends CombineTypes<[_GroupFilter$NoneMatchFilter<T>, GroupFilter<T>]> {}
                }
                interface _WorldScanner$$static extends ClassLike {
                  _combineFilter(blockFilter: java.util.function.Function<api.helper.world.BlockHelper,boolean>, stateFilter: java.util.function.Function<api.helper.world.BlockStateHelper,boolean>): java.util.function.Function<net.minecraft.class_2680,boolean>;
                  _count(container: net.minecraft.class_2841<net.minecraft.class_2680>, isInFilter: boolean[], counter: net.minecraft.class_2841$class_4464<net.minecraft.class_2680>): void;
                  _forEach(array: net.minecraft.class_3508, isInFilter: boolean[], action: java.util.function.IntConsumer): void;
                  _isParallelStreamAllowed(filter: java.util.function.Function<any,boolean>): boolean;
                  _mc: net.minecraft.class_310;
                  new(world: net.minecraft.class_1937, blockFilter: java.util.function.Function<api.helper.world.BlockHelper,boolean>, stateFilter: java.util.function.Function<api.helper.world.BlockStateHelper,boolean>): WorldScanner;
                }
                let WorldScanner: _WorldScanner$$static;
                interface _WorldScanner {
                  _addCachedState(state: net.minecraft.class_2680): boolean;
                  _getBestStream<V>(list: java.util.List<V>): java.util.stream.Stream<V>;
                  getBlocksInChunk(chunkX: int, chunkZ: int, ignoreState: boolean): java.util.Map<string,int>;
                  getBlocksInChunks(centerX: int, centerZ: int, chunkRange: int, ignoreState: boolean): java.util.Map<string,int>;
                  _getBlocksInChunksInternal(chunkPositions: java.util.List<net.minecraft.class_1923>, ignoreState: boolean): java.util.Map<string,int>;
                  getCachedAmount(): int;
                  getChunkRange(centerX: int, centerZ: int, chunkrange: int): java.util.List<net.minecraft.class_1923>;
                  _getFilterResult(state: net.minecraft.class_2680): boolean;
                  _getIncludedFilterIndices(palette: net.minecraft.class_2837<net.minecraft.class_2680>): boolean[];
                  _getReach(): double;
                  scanAroundPlayer(chunkRange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  _scanChunkInternal(pos: net.minecraft.class_1923): java.util.stream.Stream<jsmacros.api.math.Pos3D>;
                  _scanChunkInternal(pos: net.minecraft.class_1923, minY: int, maxY: int): java.util.stream.Stream<jsmacros.api.math.Pos3D>;
                  scanChunkRange(centerX: int, centerZ: int, chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  _scanChunksInternal(chunkPositions: java.util.List<net.minecraft.class_1923>): java.util.List<jsmacros.api.math.Pos3D>;
                  scanClosestReachable(): jsmacros.api.math.Pos3D;
                  scanClosestReachable(strict: boolean): jsmacros.api.math.Pos3D;
                  scanClosestReachable(pos: jsmacros.api.math.Pos3D, reach: double, a2: boolean): jsmacros.api.math.Pos3D;
                  scanCubeArea(pos: api.helper.world.BlockPosHelper, range: int): java.util.List<jsmacros.api.math.Pos3D>;
                  scanCubeArea(x: int, y: int, z: int, range: int): java.util.List<jsmacros.api.math.Pos3D>;
                  scanCubeArea(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper): java.util.List<jsmacros.api.math.Pos3D>;
                  scanCubeArea(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int): java.util.List<jsmacros.api.math.Pos3D>;
                  scanCubeAreaInclusive(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper): java.util.List<jsmacros.api.math.Pos3D>;
                  scanCubeAreaInclusive(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int): java.util.List<jsmacros.api.math.Pos3D>;
                  _scanCubeAreaInternal(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int): java.util.stream.Stream<jsmacros.api.math.Pos3D>;
                  scanReachable(): java.util.List<jsmacros.api.math.Pos3D>;
                  scanReachable(strict: boolean): java.util.List<jsmacros.api.math.Pos3D>;
                  scanReachable(pos: jsmacros.api.math.Pos3D): java.util.List<jsmacros.api.math.Pos3D>;
                  scanReachable(pos: jsmacros.api.math.Pos3D, reach: double): java.util.List<jsmacros.api.math.Pos3D>;
                  scanReachable(pos: jsmacros.api.math.Pos3D, reach: double, a2: boolean): java.util.List<jsmacros.api.math.Pos3D>;
                  _scanReachableInternal(pos: net.minecraft.class_243, reach: double, a2: boolean): java.util.stream.Stream<jsmacros.api.math.Pos3D>;
                  scanSphereArea(pos: jsmacros.api.math.Pos3D, radius: double): java.util.List<jsmacros.api.math.Pos3D>;
                  scanSphereArea(x: double, a1: double, y: double, a3: double): java.util.List<jsmacros.api.math.Pos3D>;
                  _streamChunkSections(chunk: net.minecraft.class_2791, consumer: WorldScanner$TriConsumer<net.minecraft.class_2826,int,boolean[]>): void;
                  _streamChunkSections(chunk: net.minecraft.class_2791, minY: int, maxY: int, consumer: WorldScanner$TriConsumer<net.minecraft.class_2826,int,boolean[]>): void;
                  _cachedFilterStates: java.util.Map<net.minecraft.class_2680,boolean>;
                  _filter: java.util.function.Function<net.minecraft.class_2680,boolean>;
                  _useParallelStream: boolean;
                  _world: net.minecraft.class_1937;
                }
                interface WorldScanner extends CombineTypes<[_WorldScanner, java.lang.Object]> {}
                interface _WorldScanner$TriConsumer$$static<A,B,C> extends ClassLike {
                }
                let WorldScanner$TriConsumer: _WorldScanner$TriConsumer$$static<A,B,C>;
                interface _WorldScanner$TriConsumer<A,B,C> {
                  accept(a0: A, a1: B, a2: C): void;
(a0: A, a1: B, a2: C): void;
                }
                interface WorldScanner$TriConsumer<A,B,C> extends CombineTypes<[_WorldScanner$TriConsumer<A,B,C>, java.lang.Object]> {}
                interface _WorldScannerBuilder$$static extends ClassLike {
                  new(): WorldScannerBuilder;
                }
                let WorldScannerBuilder: _WorldScannerBuilder$$static;
                interface _WorldScannerBuilder {
                  andBlockFilter(method: string): WorldScannerBuilder;
                  andStateFilter(method: string): WorldScannerBuilder;
                  andStringBlockFilter(): WorldScannerBuilder;
                  andStringStateFilter(): WorldScannerBuilder;
                  build(): WorldScanner;
                  _canCreateNewFilter(): boolean;
                  _composeFilters<T>(filter: worldscanner.filter.api.IFilter<T>): void;
                  contains(args: string[]): WorldScannerBuilder;
                  contains(...args: string[]): WorldScannerBuilder;
                  _createNewFilter(operation: WorldScannerBuilder$Operation, category: WorldScannerBuilder$FilterCategory, method: string): void;
                  _createStringFilter(method: string, args: string[]): void;
                  _createStringFilter(method: string, ...args: string[]): void;
                  endsWith(args: string[]): WorldScannerBuilder;
                  endsWith(...args: string[]): WorldScannerBuilder;
                  equals(args: string[]): WorldScannerBuilder;
                  equals(...args: string[]): WorldScannerBuilder;
                  _finishFilter(): void;
                  _getTargetFilter(): worldscanner.filter.api.IAdvancedFilter<any>;
                  is(args: any[]): WorldScannerBuilder;
                  is(...args: any[]): WorldScannerBuilder;
                  is(methodArgs: any[], filterArgs: any[]): WorldScannerBuilder;
                  matches(args: string[]): WorldScannerBuilder;
                  matches(...args: string[]): WorldScannerBuilder;
                  notBlockFilter(): WorldScannerBuilder;
                  notStateFilter(): WorldScannerBuilder;
                  orBlockFilter(method: string): WorldScannerBuilder;
                  orStateFilter(method: string): WorldScannerBuilder;
                  orStringBlockFilter(): WorldScannerBuilder;
                  orStringStateFilter(): WorldScannerBuilder;
                  _setTargetFilter(filter: worldscanner.filter.api.IAdvancedFilter<any>): void;
                  startsWith(args: string[]): WorldScannerBuilder;
                  startsWith(...args: string[]): WorldScannerBuilder;
                  test(args: any[]): WorldScannerBuilder;
                  test(...args: any[]): WorldScannerBuilder;
                  test(methodArgs: any[], filterArgs: any[]): WorldScannerBuilder;
                  withBlockFilter(method: string): WorldScannerBuilder;
                  withStateFilter(method: string): WorldScannerBuilder;
                  withStringBlockFilter(): WorldScannerBuilder;
                  withStringStateFilter(): WorldScannerBuilder;
                  _blockFilter: filter.api.IAdvancedFilter<api.helper.world.BlockHelper>;
                  _method: string;
                  _operation: WorldScannerBuilder$Operation;
                  _selectedCategory: WorldScannerBuilder$FilterCategory;
                  _stateFilter: filter.api.IAdvancedFilter<api.helper.world.BlockStateHelper>;
                }
                interface WorldScannerBuilder extends CombineTypes<[_WorldScannerBuilder, java.lang.Object]> {}
                interface _WorldScannerBuilder$FilterCategory$$static extends ClassLike {
                  valueOf(name: string): WorldScannerBuilder$FilterCategory;
                  values(): WorldScannerBuilder$FilterCategory[];
                  readonly BLOCK: WorldScannerBuilder$FilterCategory;
                  readonly NONE: WorldScannerBuilder$FilterCategory;
                  readonly STATE: WorldScannerBuilder$FilterCategory;
                }
                let WorldScannerBuilder$FilterCategory: _WorldScannerBuilder$FilterCategory$$static;
                interface _WorldScannerBuilder$FilterCategory {
                }
                interface WorldScannerBuilder$FilterCategory extends CombineTypes<[_WorldScannerBuilder$FilterCategory]> {}
                interface _WorldScannerBuilder$Operation$$static extends ClassLike {
                  valueOf(name: string): WorldScannerBuilder$Operation;
                  values(): WorldScannerBuilder$Operation[];
                  readonly AND: WorldScannerBuilder$Operation;
                  readonly NEW: WorldScannerBuilder$Operation;
                  readonly NONE: WorldScannerBuilder$Operation;
                  readonly NOT: WorldScannerBuilder$Operation;
                  readonly OR: WorldScannerBuilder$Operation;
                  readonly XOR: WorldScannerBuilder$Operation;
                }
                let WorldScannerBuilder$Operation: _WorldScannerBuilder$Operation$$static;
                interface _WorldScannerBuilder$Operation {
                }
                interface WorldScannerBuilder$Operation extends CombineTypes<[_WorldScannerBuilder$Operation]> {}
              }
              interface _CustomImage$$static extends ClassLike {
                _createTexture(image: java.awt.image.BufferedImage, name: string): net.minecraft.class_1043;
                createWidget(width: int, height: int, name: string): CustomImage;
                createWidget(path: string, name: string): CustomImage;
                nativeARGBFlip(argb: int): int;
                readonly IMAGES: java.util.Map<string,CustomImage>;
                _PREFIX: string;
                _currentId: int;
                new(image: java.awt.image.BufferedImage): CustomImage;
                new(image: java.awt.image.BufferedImage, name: string): CustomImage;
              }
              let CustomImage: _CustomImage$$static;
              interface _CustomImage {
                clearRect(x: int, y: int, width: int, height: int): CustomImage;
                clearRect(x: int, y: int, width: int, height: int, color: int): CustomImage;
                clipRect(x: int, y: int, width: int, height: int): CustomImage;
                copyArea(x: int, y: int, width: int, height: int, dx: int, dy: int): CustomImage;
                draw3DRect(x: int, y: int, width: int, height: int, raised: boolean): CustomImage;
                drawArc(x: int, y: int, width: int, height: int, startAngle: int, arcAngle: int): CustomImage;
                drawImage(img: java.awt.Image, x: int, y: int, width: int, height: int): CustomImage;
                drawImage(img: java.awt.Image, x: int, y: int, width: int, height: int, sourceX: int, sourceY: int, sourceWidth: int, sourceHeight: int): CustomImage;
                drawLine(x1: int, y1: int, x2: int, y2: int): CustomImage;
                drawOval(x: int, y: int, width: int, height: int): CustomImage;
                drawPolygon(pointsX: int[], pointsY: int[]): CustomImage;
                drawPolygonLine(pointsX: int[], pointsY: int[]): CustomImage;
                drawRect(x: int, y: int, width: int, height: int): CustomImage;
                drawRoundRect(x: int, y: int, width: int, height: int, arcWidth: int, arcHeight: int): CustomImage;
                drawString(x: int, y: int, text: string): CustomImage;
                fill3DRect(x: int, y: int, width: int, height: int, raised: boolean): CustomImage;
                fillArc(x: int, y: int, width: int, height: int, startAngle: int, arcAngle: int): CustomImage;
                fillOval(x: int, y: int, width: int, height: int): CustomImage;
                fillPolygon(pointsX: int[], pointsY: int[]): CustomImage;
                fillRect(x: int, y: int, width: int, height: int): CustomImage;
                fillRoundRect(x: int, y: int, width: int, height: int, arcWidth: int, arcHeight: int): CustomImage;
                getClipBounds(): java.awt.Rectangle;
                getGraphicsColor(): int;
                getHeight(): int;
                getIdentifier(): string;
                getImage(): java.awt.image.BufferedImage;
                getName(): string;
                getPixel(x: int, y: int): int;
                getStringWidth(toAnalyze: string): int;
                getWidth(): int;
                loadImage(path: string): java.awt.image.BufferedImage;
                loadImage(path: string, x: int, y: int, width: int, height: int): java.awt.image.BufferedImage;
                saveImage(path: string, fileName: string): CustomImage;
                setClip(x: int, y: int, width: int, height: int): CustomImage;
                setGraphicsColor(color: int): CustomImage;
                setPaintMode(): CustomImage;
                setPixel(x: int, y: int, argb: int): CustomImage;
                setXorMode(color: int): CustomImage;
                translate(x: int, y: int): CustomImage;
                update(): CustomImage;
                _updateTexture(): void;
                _graphics: java.awt.Graphics2D;
                _identifier: net.minecraft.class_2960;
                _image: java.awt.image.BufferedImage;
                _name: string;
                _texture: net.minecraft.class_1043;
              }
              interface CustomImage extends CombineTypes<[_CustomImage, java.lang.Object]> {}
              interface _FakeServerCommandSource$$static extends ClassLike {
                new(source: net.minecraft.class_637, player: net.minecraft.class_746): FakeServerCommandSource;
              }
              let FakeServerCommandSource: _FakeServerCommandSource$$static;
              interface _FakeServerCommandSource {
                method_17771(): java.util.Collection<net.minecraft.class_2172$class_2173>;
                method_17772(): java.util.Collection<net.minecraft.class_2172$class_2173>;
                method_29310(): java.util.Set<net.minecraft.class_5321<net.minecraft.class_1937>>;
                method_30497(): net.minecraft.class_5455;
                method_44750(): java.util.Collection<string>;
                method_54307(a0: net.minecraft.class_8935): net.minecraft.class_8839;
                method_9226(feedbackSupplier: java.util.function.Supplier<net.minecraft.class_2561>, broadcastToOps: boolean): void;
                method_9254(): java.util.stream.Stream<net.minecraft.class_2960>;
                method_9261(context: com.mojang.brigadier.context.CommandContext<any>): java.util.concurrent.CompletableFuture<com.mojang.brigadier.suggestion.Suggestions>;
                method_9262(): java.util.Collection<string>;
                method_9267(): java.util.Collection<string>;
                method_9269(): java.util.Collection<string>;
                _source: net.minecraft.class_637;
              }
              interface FakeServerCommandSource extends CombineTypes<[_FakeServerCommandSource, net.minecraft.class_2168]> {}
              interface _InteractionProxy$$static extends ClassLike {
                reset(): void;
                _mc: net.minecraft.class_310;
                new(): InteractionProxy;
              }
              let InteractionProxy: _InteractionProxy$$static;
              interface _InteractionProxy {
              }
              interface InteractionProxy extends CombineTypes<[_InteractionProxy, java.lang.Object]> {}
              interface _InteractionProxy$Break$$static extends ClassLike {
                addCallback(callback: java.util.function.Consumer<InteractionProxy$Break$BreakBlockResult>, breaking: boolean): void;
                isBreaking(): boolean;
                onBreakBlock(pos: net.minecraft.class_2338, ret: boolean): void;
                _runCallback(reason: string, pos: net.minecraft.class_2338): void;
                _runCallback(result: InteractionProxy$Break$BreakBlockResult): void;
                setOverride(value: boolean): void;
                setOverride(value: boolean, reason: string): void;
                _setOverride(value: boolean, reason: string, pos: net.minecraft.class_2338): void;
                _callbacks: java.util.List<java.util.function.Consumer<InteractionProxy$Break$BreakBlockResult>>;
                _lastTarget: net.minecraft.class_2338;
                _override: boolean;
                new(): InteractionProxy$Break;
              }
              let InteractionProxy$Break: _InteractionProxy$Break$$static;
              interface _InteractionProxy$Break {
              }
              interface InteractionProxy$Break extends CombineTypes<[_InteractionProxy$Break, java.lang.Object]> {}
              interface _InteractionProxy$Break$BreakBlockResult$$static extends ClassLike {
                readonly UNAVAILABLE: InteractionProxy$Break$BreakBlockResult;
                new(reason: string, pos: api.helper.world.BlockPosHelper): InteractionProxy$Break$BreakBlockResult;
              }
              let InteractionProxy$Break$BreakBlockResult: _InteractionProxy$Break$BreakBlockResult$$static;
              interface _InteractionProxy$Break$BreakBlockResult {
                toString(): string;
                readonly pos: api.helper.world.BlockPosHelper;
                readonly reason: string;
              }
              interface InteractionProxy$Break$BreakBlockResult extends CombineTypes<[_InteractionProxy$Break$BreakBlockResult, java.lang.Object]> {}
              interface _InteractionProxy$Interact$$static extends ClassLike {
                ensureInteracting(cooldown: int): void;
                isInteracting(): boolean;
                setOverride(value: boolean): void;
                _override: boolean;
                _releaseCheck: boolean;
                new(): InteractionProxy$Interact;
              }
              let InteractionProxy$Interact: _InteractionProxy$Interact$$static;
              interface _InteractionProxy$Interact {
              }
              interface InteractionProxy$Interact extends CombineTypes<[_InteractionProxy$Interact, java.lang.Object]> {}
              interface _InteractionProxy$Target$$static extends ClassLike {
                hasOverride(): boolean;
                isInRange(tickDelta: float): boolean;
                onUpdate(tickDelta: float): boolean;
                resetChecks(): void;
                setTarget(value: net.minecraft.class_239): void;
                setTargetBlock(pos: net.minecraft.class_2338, direction: net.minecraft.class_2350): void;
                setTargetMissed(): void;
                _MISSED: net.minecraft.class_3965;
                checkAir: boolean;
                checkDistance: boolean;
                checkShape: boolean;
                clearIfEmptyShape: boolean;
                clearIfIsAir: boolean;
                clearIfOutOfRange: boolean;
                _override: net.minecraft.class_239;
                _overrideEntity: net.minecraft.class_1297;
                new(): InteractionProxy$Target;
              }
              let InteractionProxy$Target: _InteractionProxy$Target$$static;
              interface _InteractionProxy$Target {
              }
              interface InteractionProxy$Target extends CombineTypes<[_InteractionProxy$Target, java.lang.Object]> {}
              interface _RegistryHelper$$static extends ClassLike {
                parseIdentifier(id: string): net.minecraft.class_2960;
                parseNameSpace(id: string): string;
                readonly ALL_EQUALITY_OWNER: net.minecraft.class_7876<any>;
                readonly NBT_OPS_UNLIMITED: net.minecraft.class_6903<net.minecraft.class_2520>;
                _REGISTRY_INFO_GETTER_UNLIMITED: net.minecraft.class_6903$class_7863;
                readonly WRAPPER_LOOKUP_UNLIMITED: net.minecraft.class_7225$class_7874;
                new(): RegistryHelper;
              }
              let RegistryHelper: _RegistryHelper$$static;
              interface _RegistryHelper {
                getActivityTypeIds(): java.util.List<string>;
                getBlock(id: string): api.helper.world.BlockHelper;
                getBlockEntityTypeIds(): java.util.List<string>;
                getBlockIds(): java.util.List<string>;
                getBlockState(id: string): api.helper.world.BlockStateHelper;
                getBlockState(id: string, nbt: string): api.helper.world.BlockStateHelper;
                getBlocks(): java.util.List<api.helper.world.BlockHelper>;
                getEnchantment(id: string): api.helper.inventory.EnchantmentHelper;
                getEnchantment(id: string, level: int): api.helper.inventory.EnchantmentHelper;
                getEnchantmentIds(): java.util.List<string>;
                getEnchantments(): java.util.List<api.helper.inventory.EnchantmentHelper>;
                getEntity(type: string): api.helper.world.entity.EntityHelper<any>;
                getEntityAttributeIds(): java.util.List<string>;
                getEntityTypeIds(): java.util.List<string>;
                getFeatureIds(): java.util.List<string>;
                getFluidState(id: string): api.helper.world.FluidStateHelper;
                getGameEventNames(): java.util.List<string>;
                getIdentifier(identifier: string): net.minecraft.class_2960;
                getItem(id: string): api.helper.inventory.ItemHelper;
                getItemIds(): java.util.List<string>;
                getItemStack(id: string): api.helper.inventory.ItemStackHelper;
                getItemStack(id: string, nbt: string): api.helper.inventory.ItemStackHelper;
                getItems(): java.util.List<api.helper.inventory.ItemHelper>;
                getMemoryModuleTypeIds(): java.util.List<string>;
                getPaintingIds(): java.util.List<string>;
                getParticleTypeIds(): java.util.List<string>;
                getPointOfInterestTypeIds(): java.util.List<string>;
                getPotionTypeIds(): java.util.List<string>;
                getRawEntityType(type: string): net.minecraft.class_1299<any>;
                getRecipeTypeIds(): java.util.List<string>;
                getScreenHandlerIds(): java.util.List<string>;
                getSensorTypeIds(): java.util.List<string>;
                getStatTypeIds(): java.util.List<string>;
                getStatusEffect(id: string): api.helper.StatusEffectHelper;
                getStatusEffectIds(): java.util.List<string>;
                getStatusEffects(): java.util.List<api.helper.StatusEffectHelper>;
                getStructureFeatureIds(): java.util.List<string>;
                getVillagerProfessionIds(): java.util.List<string>;
                getVillagerTypeIds(): java.util.List<string>;
                _mc: net.minecraft.class_310;
              }
              interface RegistryHelper extends CombineTypes<[_RegistryHelper, java.lang.Object]> {}
              interface _TextBuilder$$static extends ClassLike {
                new(): TextBuilder;
              }
              let TextBuilder: _TextBuilder$$static;
              interface _TextBuilder {
                append(text: any): TextBuilder;
                _appendInternal(text: string): void;
                _appendInternal(helper: api.helper.TextHelper): void;
                build(): api.helper.TextHelper;
                getWidth(): int;
                withClickEvent(action: string, value: string): TextBuilder;
                withColor(color: int): TextBuilder;
                withColor(r: int, g: int, b: int): TextBuilder;
                withCustomClickEvent(action: jsmacros.core.MethodWrapper<any,any,any,any>): TextBuilder;
                withFormatting(underline: boolean, bold: boolean, italic: boolean, strikethrough: boolean, magic: boolean): TextBuilder;
                withFormatting(formattings: api.helper.FormattingHelper[]): TextBuilder;
                withFormatting(...formattings: api.helper.FormattingHelper[]): TextBuilder;
                withShowEntityHover(entity: api.helper.world.entity.EntityHelper<net.minecraft.class_1297>): TextBuilder;
                withShowItemHover(item: api.helper.inventory.ItemStackHelper): TextBuilder;
                withShowTextHover(text: api.helper.TextHelper): TextBuilder;
                withStyle(style: api.helper.StyleHelper): TextBuilder;
                _head: net.minecraft.class_5250;
                _self: net.minecraft.class_5250;
              }
              interface TextBuilder extends CombineTypes<[_TextBuilder, java.lang.Object]> {}
            }
            module event {
              module filterer {
                interface _FiltererBlockUpdate$$static extends ClassLike {
                  new(): FiltererBlockUpdate;
                }
                let FiltererBlockUpdate: _FiltererBlockUpdate$$static;
                interface _FiltererBlockUpdate {
                  canFilter(event: string): boolean;
                  setArea(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int): FiltererBlockUpdate;
                  setArea(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper): FiltererBlockUpdate;
                  setBlockId(id: string): FiltererBlockUpdate;
                  setBlockState(property: string, value: string): FiltererBlockUpdate;
                  setBlockStates(states: java.util.Map<string,string>): FiltererBlockUpdate;
                  setPos(x: int, y: int, z: int): FiltererBlockUpdate;
                  setPos(pos: api.helper.world.BlockPosHelper): FiltererBlockUpdate;
                  setUpdateType(type: string): FiltererBlockUpdate;
                  test(baseEvent: jsmacros.core.event.BaseEvent): boolean;
                  blockId: string;
                  blockState: java.util.Map<string,string>;
                  pos: api.helper.world.BlockPosHelper;
                  pos2: api.helper.world.BlockPosHelper;
                  updateType: string;
                }
                interface FiltererBlockUpdate extends CombineTypes<[_FiltererBlockUpdate, xyz.wagyourtail.jsmacros.core.event.EventFilterer, java.lang.Object]> {}
                interface _FiltererRecvPacket$$static extends ClassLike {
                  new(): FiltererRecvPacket;
                }
                let FiltererRecvPacket: _FiltererRecvPacket$$static;
                interface _FiltererRecvPacket {
                  canFilter(event: string): boolean;
                  setType(type: string): FiltererRecvPacket;
                  test(event: jsmacros.core.event.BaseEvent): boolean;
                  type: string;
                }
                interface FiltererRecvPacket extends CombineTypes<[_FiltererRecvPacket, xyz.wagyourtail.jsmacros.core.event.EventFilterer, java.lang.Object]> {}
                interface _FiltererSendPacket$$static extends ClassLike {
                  new(): FiltererSendPacket;
                }
                let FiltererSendPacket: _FiltererSendPacket$$static;
                interface _FiltererSendPacket {
                  canFilter(event: string): boolean;
                  setType(type: string): FiltererSendPacket;
                  test(event: jsmacros.core.event.BaseEvent): boolean;
                  type: string;
                }
                interface FiltererSendPacket extends CombineTypes<[_FiltererSendPacket, xyz.wagyourtail.jsmacros.core.event.EventFilterer, java.lang.Object]> {}
              }
              module impl {
                module inventory {
                  interface _EventClickSlot$$static extends ClassLike {
                    new(screen: net.minecraft.class_465<any>, mode: int, button: int, slot: int): EventClickSlot;
                  }
                  let EventClickSlot: _EventClickSlot$$static;
                  interface _EventClickSlot {
                    getInventory(): api.classes.inventory.Inventory<any>;
                    toString(): string;
                    readonly button: int;
                    readonly mode: int;
                    _screen: net.minecraft.class_465<any>;
                    readonly slot: int;
                  }
                  interface EventClickSlot extends CombineTypes<[_EventClickSlot, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventContainerUpdate$$static extends ClassLike {
                    new(screen: net.minecraft.class_465<any>): EventContainerUpdate;
                  }
                  let EventContainerUpdate: _EventContainerUpdate$$static;
                  interface _EventContainerUpdate {
                    toString(): string;
                    readonly inventory: api.classes.inventory.Inventory<any>;
                    readonly screen: api.classes.render.IScreen;
                  }
                  interface EventContainerUpdate extends CombineTypes<[_EventContainerUpdate, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventDropSlot$$static extends ClassLike {
                    _mc: net.minecraft.class_310;
                    new(screen: net.minecraft.class_465<any>, slot: int, all: boolean): EventDropSlot;
                  }
                  let EventDropSlot: _EventDropSlot$$static;
                  interface _EventDropSlot {
                    getInventory(): api.classes.inventory.Inventory<any>;
                    toString(): string;
                    readonly all: boolean;
                    _screen: net.minecraft.class_465<any>;
                    readonly slot: int;
                  }
                  interface EventDropSlot extends CombineTypes<[_EventDropSlot, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventItemDamage$$static extends ClassLike {
                    new(stack: net.minecraft.class_1799, damage: int): EventItemDamage;
                  }
                  let EventItemDamage: _EventItemDamage$$static;
                  interface _EventItemDamage {
                    toString(): string;
                    readonly damage: int;
                    readonly item: api.helper.inventory.ItemStackHelper;
                  }
                  interface EventItemDamage extends CombineTypes<[_EventItemDamage, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventItemPickup$$static extends ClassLike {
                    new(item: net.minecraft.class_1799): EventItemPickup;
                  }
                  let EventItemPickup: _EventItemPickup$$static;
                  interface _EventItemPickup {
                    toString(): string;
                    readonly item: api.helper.inventory.ItemStackHelper;
                  }
                  interface EventItemPickup extends CombineTypes<[_EventItemPickup, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventOpenContainer$$static extends ClassLike {
                    new(screen: net.minecraft.class_465<any>): EventOpenContainer;
                  }
                  let EventOpenContainer: _EventOpenContainer$$static;
                  interface _EventOpenContainer {
                    toString(): string;
                    readonly inventory: api.classes.inventory.Inventory<any>;
                    readonly screen: api.classes.render.IScreen;
                  }
                  interface EventOpenContainer extends CombineTypes<[_EventOpenContainer, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventSlotUpdate$$static extends ClassLike {
                    new(screen: net.minecraft.class_465<any>, type: string, slot: int, oldStack: net.minecraft.class_1799, newStack: net.minecraft.class_1799): EventSlotUpdate;
                  }
                  let EventSlotUpdate: _EventSlotUpdate$$static;
                  interface _EventSlotUpdate {
                    getInventory(): api.classes.inventory.Inventory<any>;
                    toString(): string;
                    readonly newStack: api.helper.inventory.ItemStackHelper;
                    readonly oldStack: api.helper.inventory.ItemStackHelper;
                    _screen: net.minecraft.class_465<any>;
                    readonly slot: int;
                    readonly type: string;
                  }
                  interface EventSlotUpdate extends CombineTypes<[_EventSlotUpdate, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                }
                module player {
                  interface _EventAirChange$$static extends ClassLike {
                    new(air: int): EventAirChange;
                  }
                  let EventAirChange: _EventAirChange$$static;
                  interface _EventAirChange {
                    toString(): string;
                    readonly air: int;
                  }
                  interface EventAirChange extends CombineTypes<[_EventAirChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventArmorChange$$static extends ClassLike {
                    new(slot: string, item: net.minecraft.class_1799, old: net.minecraft.class_1799): EventArmorChange;
                  }
                  let EventArmorChange: _EventArmorChange$$static;
                  interface _EventArmorChange {
                    toString(): string;
                    readonly item: api.helper.inventory.ItemStackHelper;
                    readonly oldItem: api.helper.inventory.ItemStackHelper;
                    readonly slot: string;
                  }
                  interface EventArmorChange extends CombineTypes<[_EventArmorChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventAttackBlock$$static extends ClassLike {
                    new(block: api.helper.world.BlockDataHelper, side: int): EventAttackBlock;
                  }
                  let EventAttackBlock: _EventAttackBlock$$static;
                  interface _EventAttackBlock {
                    toString(): string;
                    readonly block: api.helper.world.BlockDataHelper;
                    readonly side: int;
                  }
                  interface EventAttackBlock extends CombineTypes<[_EventAttackBlock, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventAttackEntity$$static extends ClassLike {
                    new(entity: net.minecraft.class_1297): EventAttackEntity;
                  }
                  let EventAttackEntity: _EventAttackEntity$$static;
                  interface _EventAttackEntity {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                  }
                  interface EventAttackEntity extends CombineTypes<[_EventAttackEntity, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventDamage$$static extends ClassLike {
                    new(source: net.minecraft.class_1282, health: float, change: float): EventDamage;
                  }
                  let EventDamage: _EventDamage$$static;
                  interface _EventDamage {
                    toString(): string;
                    readonly attacker: api.helper.world.entity.EntityHelper<any>;
                    readonly change: float;
                    readonly health: float;
                    readonly source: string;
                  }
                  interface EventDamage extends CombineTypes<[_EventDamage, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventDeath$$static extends ClassLike {
                    new(): EventDeath;
                  }
                  let EventDeath: _EventDeath$$static;
                  interface _EventDeath {
                    respawn(): void;
                    toString(): string;
                    readonly deathPos: api.helper.world.BlockPosHelper;
                    readonly inventory: java.util.List<api.helper.inventory.ItemStackHelper>;
                  }
                  interface EventDeath extends CombineTypes<[_EventDeath, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventEXPChange$$static extends ClassLike {
                    new(progress: float, total: int, level: int, prevProgress: float, prevTotal: int, prevLevel: int): EventEXPChange;
                  }
                  let EventEXPChange: _EventEXPChange$$static;
                  interface _EventEXPChange {
                    toString(): string;
                    readonly level: int;
                    readonly prevLevel: int;
                    readonly prevProgress: float;
                    readonly prevTotal: int;
                    readonly progress: float;
                    readonly total: int;
                  }
                  interface EventEXPChange extends CombineTypes<[_EventEXPChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventFallFlying$$static extends ClassLike {
                    new(state: boolean): EventFallFlying;
                  }
                  let EventFallFlying: _EventFallFlying$$static;
                  interface _EventFallFlying {
                    toString(): string;
                    readonly state: boolean;
                  }
                  interface EventFallFlying extends CombineTypes<[_EventFallFlying, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventHeal$$static extends ClassLike {
                    new(source: net.minecraft.class_1282, health: float, change: float): EventHeal;
                  }
                  let EventHeal: _EventHeal$$static;
                  interface _EventHeal {
                    toString(): string;
                    readonly change: float;
                    readonly health: float;
                    readonly source: string;
                  }
                  interface EventHeal extends CombineTypes<[_EventHeal, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventHealthChange$$static extends ClassLike {
                    new(health: float, change: float): EventHealthChange;
                  }
                  let EventHealthChange: _EventHealthChange$$static;
                  interface _EventHealthChange {
                    toString(): string;
                    readonly change: float;
                    readonly health: float;
                  }
                  interface EventHealthChange extends CombineTypes<[_EventHealthChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventHeldItemChange$$static extends ClassLike {
                    new(item: net.minecraft.class_1799, oldItem: net.minecraft.class_1799, offHand: boolean): EventHeldItemChange;
                  }
                  let EventHeldItemChange: _EventHeldItemChange$$static;
                  interface _EventHeldItemChange {
                    toString(): string;
                    readonly item: api.helper.inventory.ItemStackHelper;
                    readonly offHand: boolean;
                    readonly oldItem: api.helper.inventory.ItemStackHelper;
                  }
                  interface EventHeldItemChange extends CombineTypes<[_EventHeldItemChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventHungerChange$$static extends ClassLike {
                    new(foodLevel: int): EventHungerChange;
                  }
                  let EventHungerChange: _EventHungerChange$$static;
                  interface _EventHungerChange {
                    toString(): string;
                    readonly foodLevel: int;
                  }
                  interface EventHungerChange extends CombineTypes<[_EventHungerChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventInteractBlock$$static extends ClassLike {
                    new(offhand: boolean, accepted: boolean, block: api.helper.world.BlockDataHelper, side: int): EventInteractBlock;
                  }
                  let EventInteractBlock: _EventInteractBlock$$static;
                  interface _EventInteractBlock {
                    toString(): string;
                    readonly block: api.helper.world.BlockDataHelper;
                    readonly offhand: boolean;
                    readonly result: boolean;
                    readonly side: int;
                  }
                  interface EventInteractBlock extends CombineTypes<[_EventInteractBlock, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventInteractEntity$$static extends ClassLike {
                    new(offhand: boolean, accepted: boolean, entity: net.minecraft.class_1297): EventInteractEntity;
                  }
                  let EventInteractEntity: _EventInteractEntity$$static;
                  interface _EventInteractEntity {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    readonly offhand: boolean;
                    readonly result: boolean;
                  }
                  interface EventInteractEntity extends CombineTypes<[_EventInteractEntity, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventOpenScreen$$static extends ClassLike {
                    new(screen: net.minecraft.class_437): EventOpenScreen;
                  }
                  let EventOpenScreen: _EventOpenScreen$$static;
                  interface _EventOpenScreen {
                    toString(): string;
                    readonly screen: api.classes.render.IScreen;
                    readonly screenName: string;
                  }
                  interface EventOpenScreen extends CombineTypes<[_EventOpenScreen, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventRiding$$static extends ClassLike {
                    new(state: boolean, entity: net.minecraft.class_1297): EventRiding;
                  }
                  let EventRiding: _EventRiding$$static;
                  interface _EventRiding {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    readonly state: boolean;
                  }
                  interface EventRiding extends CombineTypes<[_EventRiding, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventSignEdit$$static extends ClassLike {
                    new(signText: java.util.List<string>, x: int, y: int, z: int, front: boolean): EventSignEdit;
                  }
                  let EventSignEdit: _EventSignEdit$$static;
                  interface _EventSignEdit {
                    toString(): string;
                    closeScreen: boolean;
                    front: boolean;
                    readonly pos: jsmacros.api.math.Pos3D;
                    signText: java.util.List<string>;
                  }
                  interface EventSignEdit extends CombineTypes<[_EventSignEdit, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventStatusEffectUpdate$$static extends ClassLike {
                    new(oldEffect: api.helper.StatusEffectHelper, newEffect: api.helper.StatusEffectHelper, added: boolean): EventStatusEffectUpdate;
                  }
                  let EventStatusEffectUpdate: _EventStatusEffectUpdate$$static;
                  interface _EventStatusEffectUpdate {
                    toString(): string;
                    readonly added: boolean;
                    readonly newEffect: api.helper.StatusEffectHelper;
                    readonly oldEffect: api.helper.StatusEffectHelper;
                    readonly removed: boolean;
                  }
                  interface EventStatusEffectUpdate extends CombineTypes<[_EventStatusEffectUpdate, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                }
                module world {
                  interface _EventBlockUpdate$$static extends ClassLike {
                    new(block: net.minecraft.class_2680, blockEntity: net.minecraft.class_2586, blockPos: net.minecraft.class_2338, updateType: string): EventBlockUpdate;
                  }
                  let EventBlockUpdate: _EventBlockUpdate$$static;
                  interface _EventBlockUpdate {
                    toString(): string;
                    readonly block: api.helper.world.BlockDataHelper;
                    readonly updateType: string;
                  }
                  interface EventBlockUpdate extends CombineTypes<[_EventBlockUpdate, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventBossbar$$static extends ClassLike {
                    new(type: string, uuid: java.util.UUID, bossBar: net.minecraft.class_345): EventBossbar;
                  }
                  let EventBossbar: _EventBossbar$$static;
                  interface _EventBossbar {
                    toString(): string;
                    readonly bossBar: api.helper.world.entity.BossBarHelper;
                    readonly type: string;
                    readonly uuid: string;
                  }
                  interface EventBossbar extends CombineTypes<[_EventBossbar, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventChunkLoad$$static extends ClassLike {
                    new(x: int, z: int, isFull: boolean): EventChunkLoad;
                  }
                  let EventChunkLoad: _EventChunkLoad$$static;
                  interface _EventChunkLoad {
                    toString(): string;
                    readonly isFull: boolean;
                    readonly x: int;
                    readonly z: int;
                  }
                  interface EventChunkLoad extends CombineTypes<[_EventChunkLoad, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventChunkUnload$$static extends ClassLike {
                    new(x: int, z: int): EventChunkUnload;
                  }
                  let EventChunkUnload: _EventChunkUnload$$static;
                  interface _EventChunkUnload {
                    toString(): string;
                    readonly x: int;
                    readonly z: int;
                  }
                  interface EventChunkUnload extends CombineTypes<[_EventChunkUnload, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventDimensionChange$$static extends ClassLike {
                    new(dimension: string): EventDimensionChange;
                  }
                  let EventDimensionChange: _EventDimensionChange$$static;
                  interface _EventDimensionChange {
                    toString(): string;
                    readonly dimension: string;
                  }
                  interface EventDimensionChange extends CombineTypes<[_EventDimensionChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventDisconnect$$static extends ClassLike {
                    new(message: net.minecraft.class_2561): EventDisconnect;
                  }
                  let EventDisconnect: _EventDisconnect$$static;
                  interface _EventDisconnect {
                    toString(): string;
                    readonly message: api.helper.TextHelper;
                  }
                  interface EventDisconnect extends CombineTypes<[_EventDisconnect, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventEntityDamaged$$static extends ClassLike {
                    new(e: net.minecraft.class_1297, health: float, amount: float): EventEntityDamaged;
                  }
                  let EventEntityDamaged: _EventEntityDamaged$$static;
                  interface _EventEntityDamaged {
                    toString(): string;
                    readonly damage: float;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    readonly health: float;
                  }
                  interface EventEntityDamaged extends CombineTypes<[_EventEntityDamaged, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventEntityHealed$$static extends ClassLike {
                    new(e: net.minecraft.class_1297, health: float, amount: float): EventEntityHealed;
                  }
                  let EventEntityHealed: _EventEntityHealed$$static;
                  interface _EventEntityHealed {
                    toString(): string;
                    readonly damage: float;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    readonly health: float;
                  }
                  interface EventEntityHealed extends CombineTypes<[_EventEntityHealed, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventEntityLoad$$static extends ClassLike {
                    new(e: net.minecraft.class_1297): EventEntityLoad;
                  }
                  let EventEntityLoad: _EventEntityLoad$$static;
                  interface _EventEntityLoad {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                  }
                  interface EventEntityLoad extends CombineTypes<[_EventEntityLoad, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventEntityUnload$$static extends ClassLike {
                    new(e: net.minecraft.class_1297, reason: net.minecraft.class_1297$class_5529): EventEntityUnload;
                  }
                  let EventEntityUnload: _EventEntityUnload$$static;
                  interface _EventEntityUnload {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    readonly reason: string;
                  }
                  interface EventEntityUnload extends CombineTypes<[_EventEntityUnload, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventJoinServer$$static extends ClassLike {
                    new(player: net.minecraft.class_746, address: string): EventJoinServer;
                  }
                  let EventJoinServer: _EventJoinServer$$static;
                  interface _EventJoinServer {
                    toString(): string;
                    readonly address: string;
                    readonly player: api.helper.world.entity.ClientPlayerEntityHelper<net.minecraft.class_746>;
                  }
                  interface EventJoinServer extends CombineTypes<[_EventJoinServer, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventNameChange$$static extends ClassLike {
                    new(entity: net.minecraft.class_1297, oldName: net.minecraft.class_2561, newName: net.minecraft.class_2561): EventNameChange;
                  }
                  let EventNameChange: _EventNameChange$$static;
                  interface _EventNameChange {
                    toString(): string;
                    readonly entity: api.helper.world.entity.EntityHelper<any>;
                    newName: api.helper.TextHelper;
                    readonly oldName: api.helper.TextHelper;
                  }
                  interface EventNameChange extends CombineTypes<[_EventNameChange, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventPlayerJoin$$static extends ClassLike {
                    new(uuid: java.util.UUID, player: net.minecraft.class_640): EventPlayerJoin;
                  }
                  let EventPlayerJoin: _EventPlayerJoin$$static;
                  interface _EventPlayerJoin {
                    toString(): string;
                    readonly UUID: string;
                    readonly player: api.helper.world.PlayerListEntryHelper;
                  }
                  interface EventPlayerJoin extends CombineTypes<[_EventPlayerJoin, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventPlayerLeave$$static extends ClassLike {
                    new(uuid: java.util.UUID, player: net.minecraft.class_640): EventPlayerLeave;
                  }
                  let EventPlayerLeave: _EventPlayerLeave$$static;
                  interface _EventPlayerLeave {
                    toString(): string;
                    readonly UUID: string;
                    readonly player: api.helper.world.PlayerListEntryHelper;
                  }
                  interface EventPlayerLeave extends CombineTypes<[_EventPlayerLeave, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventSound$$static extends ClassLike {
                    new(sound: string, volume: float, pitch: float, x: double, a4: double, y: double): EventSound;
                  }
                  let EventSound: _EventSound$$static;
                  interface _EventSound {
                    toString(): string;
                    readonly pitch: float;
                    readonly position: jsmacros.api.math.Pos3D;
                    readonly sound: string;
                    readonly volume: float;
                  }
                  interface EventSound extends CombineTypes<[_EventSound, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _EventTick$$static extends ClassLike {
                    new(): EventTick;
                  }
                  let EventTick: _EventTick$$static;
                  interface _EventTick {
                    toString(): string;
                  }
                  interface EventTick extends CombineTypes<[_EventTick, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                }
                interface _EventKey$$static extends ClassLike {
                  getKeyModifiers(mods: int): string;
                  getModInt(mods: string): int;
                  parse(key: int, scancode: int, action: int, mods: int): boolean;
                  _mc: net.minecraft.class_310;
                  _wasNullOnDown: java.util.Set<int>;
                  new(action: int, key: string, mods: string): EventKey;
                }
                let EventKey: _EventKey$$static;
                interface _EventKey {
                  toString(): string;
                  readonly action: int;
                  readonly key: string;
                  readonly mods: string;
                }
                interface EventKey extends CombineTypes<[_EventKey, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventLaunchGame$$static extends ClassLike {
                  new(playerName: string): EventLaunchGame;
                }
                let EventLaunchGame: _EventLaunchGame$$static;
                interface _EventLaunchGame {
                  toString(): string;
                  readonly playerName: string;
                }
                interface EventLaunchGame extends CombineTypes<[_EventLaunchGame, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventMouseScroll$$static extends ClassLike {
                  new(deltaX: double, a1: double): EventMouseScroll;
                }
                let EventMouseScroll: _EventMouseScroll$$static;
                interface _EventMouseScroll {
                  toString(): string;
                  readonly deltaX: double;
                  readonly deltaY: double;
                }
                interface EventMouseScroll extends CombineTypes<[_EventMouseScroll, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventQuitGame$$static extends ClassLike {
                  new(): EventQuitGame;
                }
                let EventQuitGame: _EventQuitGame$$static;
                interface _EventQuitGame {
                  toString(): string;
                }
                interface EventQuitGame extends CombineTypes<[_EventQuitGame, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventRecvMessage$$static extends ClassLike {
                  new(message: net.minecraft.class_2561, signature: net.minecraft.class_7469, indicator: net.minecraft.class_7591): EventRecvMessage;
                }
                let EventRecvMessage: _EventRecvMessage$$static;
                interface _EventRecvMessage {
                  toString(): string;
                  messageType: string;
                  signature: byte[];
                  text: api.helper.TextHelper;
                }
                interface EventRecvMessage extends CombineTypes<[_EventRecvMessage, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventRecvPacket$$static extends ClassLike {
                  new(packet: net.minecraft.class_2596<any>): EventRecvPacket;
                }
                let EventRecvPacket: _EventRecvPacket$$static;
                interface _EventRecvPacket {
                  getPacketBuffer(): api.helper.PacketByteBufferHelper;
                  toString(): string;
                  packet: net.minecraft.class_2596<any>;
                  readonly type: string;
                }
                interface EventRecvPacket extends CombineTypes<[_EventRecvPacket, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventResourcePackLoaded$$static extends ClassLike {
                  new(isGameStart: boolean): EventResourcePackLoaded;
                }
                let EventResourcePackLoaded: _EventResourcePackLoaded$$static;
                interface _EventResourcePackLoaded {
                  toString(): string;
                  readonly isGameStart: boolean;
                  readonly loadedPacks: java.util.List<string>;
                }
                interface EventResourcePackLoaded extends CombineTypes<[_EventResourcePackLoaded, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventSendMessage$$static extends ClassLike {
                  new(message: string): EventSendMessage;
                }
                let EventSendMessage: _EventSendMessage$$static;
                interface _EventSendMessage {
                  toString(): string;
                  message: string;
                }
                interface EventSendMessage extends CombineTypes<[_EventSendMessage, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventSendPacket$$static extends ClassLike {
                  new(packet: net.minecraft.class_2596<any>): EventSendPacket;
                }
                let EventSendPacket: _EventSendPacket$$static;
                interface _EventSendPacket {
                  getPacketBuffer(): api.helper.PacketByteBufferHelper;
                  replacePacket(args: any[]): void;
                  replacePacket(...args: any[]): void;
                  toString(): string;
                  packet: net.minecraft.class_2596<any>;
                  readonly type: string;
                }
                interface EventSendPacket extends CombineTypes<[_EventSendPacket, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                interface _EventTitle$$static extends ClassLike {
                  new(type: string, message: net.minecraft.class_2561): EventTitle;
                }
                let EventTitle: _EventTitle$$static;
                interface _EventTitle {
                  toString(): string;
                  message: api.helper.TextHelper;
                  readonly type: string;
                }
                interface EventTitle extends CombineTypes<[_EventTitle, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
              }
            }
            module helper {
              module inventory {
                interface _CreativeItemStackHelper$$static extends ClassLike {
                  new(itemStack: net.minecraft.class_1799): CreativeItemStackHelper;
                }
                let CreativeItemStackHelper: _CreativeItemStackHelper$$static;
                interface _CreativeItemStackHelper {
                  addEnchantment(id: string, level: int): CreativeItemStackHelper;
                  addEnchantment(enchantment: EnchantmentHelper): CreativeItemStackHelper;
                  _addEnchantment(enchantment: net.minecraft.class_6880<net.minecraft.class_1887>, level: int): CreativeItemStackHelper;
                  addLore(lore: any[]): CreativeItemStackHelper;
                  addLore(...lore: any[]): CreativeItemStackHelper;
                  _addLoreInternal(texts: net.minecraft.class_2561[]): CreativeItemStackHelper;
                  _addLoreInternal(...texts: net.minecraft.class_2561[]): CreativeItemStackHelper;
                  clearEnchantments(): CreativeItemStackHelper;
                  clearLore(): CreativeItemStackHelper;
                  hideCanDestroy(hide: boolean): CreativeItemStackHelper;
                  hideCanPlace(hide: boolean): CreativeItemStackHelper;
                  _hideComponent(type: net.minecraft.class_9331<any>, hide: boolean): CreativeItemStackHelper;
                  hideDye(hide: boolean): CreativeItemStackHelper;
                  hideEnchantments(hide: boolean): CreativeItemStackHelper;
                  hideModifiers(hide: boolean): CreativeItemStackHelper;
                  hideUnbreakable(hide: boolean): CreativeItemStackHelper;
                  removeEnchantment(enchantment: EnchantmentHelper): CreativeItemStackHelper;
                  removeEnchantment(id: string): CreativeItemStackHelper;
                  setCount(count: int): CreativeItemStackHelper;
                  setDamage(damage: int): CreativeItemStackHelper;
                  setDamage(a0: int): ItemStackHelper;
                  setDurability(durability: int): CreativeItemStackHelper;
                  setLore(lore: any[]): CreativeItemStackHelper;
                  setLore(...lore: any[]): CreativeItemStackHelper;
                  setName(name: string): CreativeItemStackHelper;
                  setName(name: TextHelper): CreativeItemStackHelper;
                  setUnbreakable(unbreakable: boolean): CreativeItemStackHelper;
                }
                interface CreativeItemStackHelper extends CombineTypes<[_CreativeItemStackHelper, xyz.wagyourtail.jsmacros.client.api.helper.inventory.ItemStackHelper]> {}
                interface _EnchantmentHelper$$static extends ClassLike {
                  _getRomanNumeral(number: int): string;
                  _mc: net.minecraft.class_310;
                  new(base: net.minecraft.class_6880<net.minecraft.class_1887>): EnchantmentHelper;
                  new(base: net.minecraft.class_6880<net.minecraft.class_1887>, level: int): EnchantmentHelper;
                  new(enchantment: string): EnchantmentHelper;
                }
                let EnchantmentHelper: _EnchantmentHelper$$static;
                interface _EnchantmentHelper {
                  canBeApplied(item: ItemHelper): boolean;
                  canBeApplied(item: ItemStackHelper): boolean;
                  conflictsWith(enchantment: string): boolean;
                  conflictsWith(enchantment: EnchantmentHelper): boolean;
                  equals(o: any): boolean;
                  getAcceptableItems(): java.util.List<ItemHelper>;
                  getCompatibleEnchantments(): java.util.List<EnchantmentHelper>;
                  getCompatibleEnchantments(ignoreType: boolean): java.util.List<EnchantmentHelper>;
                  getConflictingEnchantments(): java.util.List<EnchantmentHelper>;
                  getConflictingEnchantments(ignoreType: boolean): java.util.List<EnchantmentHelper>;
                  getId(): string;
                  getLevel(): int;
                  getLevelName(level: int): string;
                  getMaxLevel(): int;
                  getMinLevel(): int;
                  getName(): string;
                  getRomanLevelName(): TextHelper;
                  getRomanLevelName(level: int): TextHelper;
                  getWeight(): int;
                  hashCode(): int;
                  isCompatible(enchantment: string): boolean;
                  isCompatible(enchantment: EnchantmentHelper): boolean;
                  isCursed(): boolean;
                  isTreasure(): boolean;
                  toString(): string;
                  _level: int;
                }
                interface EnchantmentHelper extends CombineTypes<[_EnchantmentHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_6880<net.minecraft.class_1887>>]> {}
                interface _FoodComponentHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_4174): FoodComponentHelper;
                }
                let FoodComponentHelper: _FoodComponentHelper$$static;
                interface _FoodComponentHelper {
                  getHunger(): int;
                  getSaturation(): float;
                  isAlwaysEdible(): boolean;
                  toString(): string;
                }
                interface FoodComponentHelper extends CombineTypes<[_FoodComponentHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_4174>]> {}
                interface _ItemHelper$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(base: net.minecraft.class_1792): ItemHelper;
                }
                let ItemHelper: _ItemHelper$$static;
                interface _ItemHelper {
                  canBeNested(): boolean;
                  canBeRepairedWith(stack: ItemStackHelper): boolean;
                  getBlock(): helper.world.BlockHelper;
                  getCreativeTab(): java.util.List<TextHelper>;
                  getDefaultStack(): ItemStackHelper;
                  getEnchantability(): int;
                  getFood(): FoodComponentHelper;
                  getGroupIcon(): java.util.List<ItemStackHelper>;
                  _getGroups(): java.util.stream.Stream<net.minecraft.class_1761>;
                  getId(): string;
                  getMaxCount(): int;
                  getMaxDurability(): int;
                  getMiningSpeedMultiplier(state: helper.world.BlockStateHelper): float;
                  getName(): string;
                  getRecipeRemainder(): ItemStackHelper;
                  getStackWithNbt(nbt: string): ItemStackHelper;
                  hasRecipeRemainder(): boolean;
                  isBlockItem(): boolean;
                  isDamageable(): boolean;
                  isFireproof(): boolean;
                  isFood(): boolean;
                  isSuitableFor(block: helper.world.BlockHelper): boolean;
                  isSuitableFor(block: helper.world.BlockStateHelper): boolean;
                  isTool(): boolean;
                  isWearable(): boolean;
                  toString(): string;
                }
                interface ItemHelper extends CombineTypes<[_ItemHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1792>]> {}
                interface _ItemStackHelper$$static extends ClassLike {
                  _LORE_STYLE: net.minecraft.class_2583;
                  _mc: net.minecraft.class_310;
                  new(id: string, count: int): ItemStackHelper;
                  new(i: net.minecraft.class_1799): ItemStackHelper;
                }
                let ItemStackHelper: _ItemStackHelper$$static;
                interface _ItemStackHelper {
                  areEnchantmentsHidden(): boolean;
                  areModifiersHidden(): boolean;
                  canBeApplied(enchantment: EnchantmentHelper): boolean;
                  copy(): ItemStackHelper;
                  equals(ish: ItemStackHelper): boolean;
                  equals(is: net.minecraft.class_1799): boolean;
                  getAttackDamage(): double;
                  getCooldownProgress(): float;
                  getCount(): int;
                  getCreative(): CreativeItemStackHelper;
                  getCreativeTab(): java.util.List<TextHelper>;
                  getDamage(): int;
                  getDefaultName(): TextHelper;
                  getDestroyRestrictions(): java.util.List<BlockPredicateHelper>;
                  getDurability(): int;
                  getEnchantment(id: string): EnchantmentHelper;
                  getEnchantments(): java.util.List<EnchantmentHelper>;
                  getItem(): ItemHelper;
                  getItemID(): string;
                  getItemId(): string;
                  getLore(): java.util.List<TextHelper>;
                  getMaxCount(): int;
                  getMaxDamage(): int;
                  getMaxDurability(): int;
                  getNBT(): NBTElementHelper<any>;
                  getName(): TextHelper;
                  getPlaceRestrictions(): java.util.List<BlockPredicateHelper>;
                  getPossibleEnchantments(): java.util.List<EnchantmentHelper>;
                  getPossibleEnchantmentsFromTable(): java.util.List<EnchantmentHelper>;
                  getRepairCost(): int;
                  getTags(): java.util.List<string>;
                  hasDestroyRestrictions(): boolean;
                  hasEnchantment(enchantment: EnchantmentHelper): boolean;
                  hasEnchantment(enchantment: string): boolean;
                  hasPlaceRestrictions(): boolean;
                  isCanDestroyHidden(): boolean;
                  isCanPlaceHidden(): boolean;
                  isDamageable(): boolean;
                  isDyeHidden(): boolean;
                  isEmpty(): boolean;
                  isEnchantable(): boolean;
                  isEnchanted(): boolean;
                  isFood(): boolean;
                  _isHidden(type: net.minecraft.class_9331<any>): boolean;
                  isItemEqual(ish: ItemStackHelper): boolean;
                  isItemEqual(is: net.minecraft.class_1799): boolean;
                  isItemEqualIgnoreDamage(ish: ItemStackHelper): boolean;
                  isItemEqualIgnoreDamage(is: net.minecraft.class_1799): boolean;
                  isNBTEqual(ish: ItemStackHelper): boolean;
                  isNBTEqual(is: net.minecraft.class_1799): boolean;
                  isOnCooldown(): boolean;
                  isSuitableFor(block: helper.world.BlockHelper): boolean;
                  isSuitableFor(block: helper.world.BlockStateHelper): boolean;
                  isTool(): boolean;
                  isUnbreakable(): boolean;
                  isUnbreakableHidden(): boolean;
                  isWearable(): boolean;
                  setDamage(damage: int): ItemStackHelper;
                  toString(): string;
                }
                interface ItemStackHelper extends CombineTypes<[_ItemStackHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1799>]> {}
                interface _RecipeHelper$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(base: net.minecraft.class_10297, syncId: int): RecipeHelper;
                }
                let RecipeHelper: _RecipeHelper$$static;
                interface _RecipeHelper {
                  canCraft(): boolean;
                  canCraft(amount: int): boolean;
                  craft(craftAll: boolean): RecipeHelper;
                  getCraftableAmount(): int;
                  getGroup(): string;
                  getIngredients(): java.util.List<java.util.List<ItemStackHelper>>;
                  getOutput(): ItemStackHelper;
                  toString(): string;
                  _syncId: int;
                }
                interface RecipeHelper extends CombineTypes<[_RecipeHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_10297>]> {}
              }
              module screen {
                interface _AbstractWidgetBuilder$$static<B,T,U> extends ClassLike {
                  _new(screen: api.classes.render.IScreen): AbstractWidgetBuilder<B,T,U>;
                }
                let AbstractWidgetBuilder: _AbstractWidgetBuilder$$static<B,T,U>;
                interface _AbstractWidgetBuilder<B,T,U> {
                  active(active: boolean): B;
                  alpha(alpha: double): B;
                  build(): U;
                  _createWidget(): U;
(): U;
                  getAlpha(): float;
                  getHeight(): int;
                  getMessage(): TextHelper;
                  getParentHeight(): int;
                  getParentWidth(): int;
                  getScaledHeight(): int;
                  getScaledLeft(): int;
                  getScaledTop(): int;
                  getScaledWidth(): int;
                  getWidth(): int;
                  getX(): int;
                  getY(): int;
                  getZIndex(): int;
                  height(height: int): B;
                  isActive(): boolean;
                  isVisible(): boolean;
                  message(message: string): B;
                  message(message: TextHelper): B;
                  moveTo(x: int, y: int): B;
                  moveTo(a0: int, a1: int): api.classes.render.components.Alignable;
                  pos(x: int, y: int): B;
                  size(width: int, height: int): B;
                  visible(visible: boolean): B;
                  width(width: int): B;
                  x(x: int): B;
                  y(y: int): B;
                  zIndex(zIndex: int): B;
                  _active: boolean;
                  _alpha: float;
                  _height: int;
                  _message: net.minecraft.class_2561;
                  _screen: api.classes.render.IScreen;
                  _visible: boolean;
                  _width: int;
                  _x: int;
                  _y: int;
                  _zIndex: int;
                }
                interface AbstractWidgetBuilder<B,T,U> extends CombineTypes<[_AbstractWidgetBuilder<B,T,U>, api.classes.render.components.Alignable<B>, java.lang.Object]> {}
                interface _ButtonWidgetHelper$$static<T> extends ClassLike {
                  new(btn: T): ButtonWidgetHelper<T>;
                  new(btn: T, zIndex: int): ButtonWidgetHelper<T>;
                }
                let ButtonWidgetHelper: _ButtonWidgetHelper$$static<T>;
                interface _ButtonWidgetHelper<T> {
                }
                interface ButtonWidgetHelper<T> extends CombineTypes<[_ButtonWidgetHelper<T>, ClickableWidgetHelper<ButtonWidgetHelper<T>,T>]> {}
                interface _ButtonWidgetHelper$ButtonBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen): ButtonWidgetHelper$ButtonBuilder;
                }
                let ButtonWidgetHelper$ButtonBuilder: _ButtonWidgetHelper$ButtonBuilder$$static;
                interface _ButtonWidgetHelper$ButtonBuilder {
                  action(action: jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_4185>,api.classes.render.IScreen,any,any>): ButtonWidgetHelper$ButtonBuilder;
                  createWidget(): ButtonWidgetHelper<net.minecraft.class_4185>;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_4185>,api.classes.render.IScreen,any,any>;
                  height(height: int): ButtonWidgetHelper$ButtonBuilder;
                  height(a0: int): AbstractWidgetBuilder;
                  size(width: int, height: int): ButtonWidgetHelper$ButtonBuilder;
                  size(a0: int, a1: int): AbstractWidgetBuilder;
                  _action: jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_4185>,api.classes.render.IScreen,any,any>;
                }
                interface ButtonWidgetHelper$ButtonBuilder extends CombineTypes<[_ButtonWidgetHelper$ButtonBuilder, AbstractWidgetBuilder<ButtonWidgetHelper$ButtonBuilder,net.minecraft.class_4185,ButtonWidgetHelper<net.minecraft.class_4185>>]> {}
                interface _ButtonWidgetHelper$TexturedButtonBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen): ButtonWidgetHelper$TexturedButtonBuilder;
                }
                let ButtonWidgetHelper$TexturedButtonBuilder: _ButtonWidgetHelper$TexturedButtonBuilder$$static;
                interface _ButtonWidgetHelper$TexturedButtonBuilder {
                  action(action: jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_344>,api.classes.render.IScreen,any,any>): ButtonWidgetHelper$TexturedButtonBuilder;
                  createWidget(): ButtonWidgetHelper<net.minecraft.class_344>;
                  createWidget(): ClickableWidgetHelper;
                  disabledFocusedTexture(disabledFocused: net.minecraft.class_2960): ButtonWidgetHelper$TexturedButtonBuilder;
                  disabledFocusedTexture(disabledFocused: string): ButtonWidgetHelper$TexturedButtonBuilder;
                  disabledTexture(disabled: net.minecraft.class_2960): ButtonWidgetHelper$TexturedButtonBuilder;
                  disabledTexture(disabled: string): ButtonWidgetHelper$TexturedButtonBuilder;
                  enabledFocusedTexture(enabledFocused: net.minecraft.class_2960): ButtonWidgetHelper$TexturedButtonBuilder;
                  enabledFocusedTexture(enabledFocused: string): ButtonWidgetHelper$TexturedButtonBuilder;
                  enabledTexture(enabled: net.minecraft.class_2960): ButtonWidgetHelper$TexturedButtonBuilder;
                  enabledTexture(enabled: string): ButtonWidgetHelper$TexturedButtonBuilder;
                  getAction(): jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_344>,api.classes.render.IScreen,any,any>;
                  height(height: int): ButtonWidgetHelper$TexturedButtonBuilder;
                  height(a0: int): AbstractWidgetBuilder;
                  size(width: int, height: int): ButtonWidgetHelper$TexturedButtonBuilder;
                  size(a0: int, a1: int): AbstractWidgetBuilder;
                  _action: jsmacros.core.MethodWrapper<ButtonWidgetHelper<net.minecraft.class_344>,api.classes.render.IScreen,any,any>;
                  _disabled: net.minecraft.class_2960;
                  _disabledFocused: net.minecraft.class_2960;
                  _enabled: net.minecraft.class_2960;
                  _enabledFocused: net.minecraft.class_2960;
                }
                interface ButtonWidgetHelper$TexturedButtonBuilder extends CombineTypes<[_ButtonWidgetHelper$TexturedButtonBuilder, AbstractWidgetBuilder<ButtonWidgetHelper$TexturedButtonBuilder,net.minecraft.class_344,ButtonWidgetHelper<net.minecraft.class_344>>]> {}
                interface _ChatHudLineHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_303, hud: net.minecraft.class_338): ChatHudLineHelper;
                }
                let ChatHudLineHelper: _ChatHudLineHelper$$static;
                interface _ChatHudLineHelper {
                  deleteById(): ChatHudLineHelper;
                  getCreationTick(): int;
                  getText(): TextHelper;
                  toString(): string;
                  _hud: net.minecraft.class_338;
                }
                interface ChatHudLineHelper extends CombineTypes<[_ChatHudLineHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_303>]> {}
                interface _CheckBoxWidgetHelper$$static extends ClassLike {
                  new(btn: net.minecraft.class_4286): CheckBoxWidgetHelper;
                  new(btn: net.minecraft.class_4286, zIndex: int): CheckBoxWidgetHelper;
                }
                let CheckBoxWidgetHelper: _CheckBoxWidgetHelper$$static;
                interface _CheckBoxWidgetHelper {
                  isChecked(): boolean;
                  setChecked(checked: boolean): CheckBoxWidgetHelper;
                  toString(): string;
                  toggle(): CheckBoxWidgetHelper;
                }
                interface CheckBoxWidgetHelper extends CombineTypes<[_CheckBoxWidgetHelper, ClickableWidgetHelper<CheckBoxWidgetHelper,net.minecraft.class_4286>]> {}
                interface _CheckBoxWidgetHelper$CheckBoxBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen): CheckBoxWidgetHelper$CheckBoxBuilder;
                }
                let CheckBoxWidgetHelper$CheckBoxBuilder: _CheckBoxWidgetHelper$CheckBoxBuilder$$static;
                interface _CheckBoxWidgetHelper$CheckBoxBuilder {
                  action(action: jsmacros.core.MethodWrapper<CheckBoxWidgetHelper,api.classes.render.IScreen,any,any>): CheckBoxWidgetHelper$CheckBoxBuilder;
                  checked(checked: boolean): CheckBoxWidgetHelper$CheckBoxBuilder;
                  createWidget(): CheckBoxWidgetHelper;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<CheckBoxWidgetHelper,api.classes.render.IScreen,any,any>;
                  isChecked(): boolean;
                  _action: jsmacros.core.MethodWrapper<CheckBoxWidgetHelper,api.classes.render.IScreen,any,any>;
                  _checked: boolean;
                }
                interface CheckBoxWidgetHelper$CheckBoxBuilder extends CombineTypes<[_CheckBoxWidgetHelper$CheckBoxBuilder, AbstractWidgetBuilder<CheckBoxWidgetHelper$CheckBoxBuilder,net.minecraft.class_4286,CheckBoxWidgetHelper>]> {}
                interface _ClickableWidgetHelper$$static<B,T> extends ClassLike {
                  clickedOn(screen: api.classes.render.IScreen): void;
                  new(btn: T): ClickableWidgetHelper<B,T>;
                  new(btn: T, zIndex: int): ClickableWidgetHelper<B,T>;
                }
                let ClickableWidgetHelper: _ClickableWidgetHelper$$static<B,T>;
                interface _ClickableWidgetHelper<B,T> {
                  addTooltip(tooltip: any): B;
                  click(): B;
                  click(await: boolean): B;
                  getActive(): boolean;
                  getHeight(): int;
                  getLabel(): TextHelper;
                  getParentHeight(): int;
                  getParentWidth(): int;
                  getScaledHeight(): int;
                  getScaledLeft(): int;
                  getScaledTop(): int;
                  getScaledWidth(): int;
                  getTooltips(): java.util.List<TextHelper>;
                  getWidth(): int;
                  getX(): int;
                  getY(): int;
                  getZIndex(): int;
                  method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  moveTo(x: int, y: int): B;
                  moveTo(a0: int, a1: int): api.classes.render.components.Alignable;
                  removeTooltip(index: int): boolean;
                  removeTooltip(tooltip: TextHelper): boolean;
                  setActive(t: boolean): B;
                  setLabel(label: string): B;
                  setLabel(helper: TextHelper): B;
                  setPos(x: int, y: int): B;
                  setTooltip(tooltips: any[]): B;
                  setTooltip(...tooltips: any[]): B;
                  setWidth(width: int): B;
                  toString(): string;
                  tooltips: java.util.List<net.minecraft.class_2561>;
                  zIndex: int;
                }
                interface ClickableWidgetHelper<B,T> extends CombineTypes<[_ClickableWidgetHelper<B,T>, api.classes.render.components.RenderElement, api.classes.render.components.Alignable<B>, jsmacros.core.helpers.BaseHelper<T>]> {}
                interface _CyclingButtonWidgetHelper$$static<T> extends ClassLike {
                  new(btn: net.minecraft.class_5676<T>): CyclingButtonWidgetHelper<T>;
                  new(btn: net.minecraft.class_5676<T>, zIndex: int): CyclingButtonWidgetHelper<T>;
                }
                let CyclingButtonWidgetHelper: _CyclingButtonWidgetHelper$$static<T>;
                interface _CyclingButtonWidgetHelper<T> {
                  backward(): CyclingButtonWidgetHelper<T>;
                  cycle(amount: int): CyclingButtonWidgetHelper<T>;
                  forward(): CyclingButtonWidgetHelper<T>;
                  getStringValue(): string;
                  getValue(): T;
                  setValue(val: T): boolean;
                  toString(): string;
                }
                interface CyclingButtonWidgetHelper<T> extends CombineTypes<[_CyclingButtonWidgetHelper<T>, ClickableWidgetHelper<CyclingButtonWidgetHelper<T>,net.minecraft.class_5676<T>>]> {}
                interface _CyclingButtonWidgetHelper$CyclicButtonBuilder$$static<T> extends ClassLike {
                  new(screen: api.classes.render.IScreen, valueToText: jsmacros.core.MethodWrapper<T,any,TextHelper,any>): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                }
                let CyclingButtonWidgetHelper$CyclicButtonBuilder: _CyclingButtonWidgetHelper$CyclicButtonBuilder$$static<T>;
                interface _CyclingButtonWidgetHelper$CyclicButtonBuilder<T> {
                  action(action: jsmacros.core.MethodWrapper<CyclingButtonWidgetHelper<T>,api.classes.render.IScreen,any,any>): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  alternateToggle(alternateToggle: jsmacros.core.MethodWrapper<any,any,boolean,any>): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  alternatives(values: T[]): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  alternatives(...values: T[]): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  createWidget(): CyclingButtonWidgetHelper<T>;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<CyclingButtonWidgetHelper<T>,api.classes.render.IScreen,any,any>;
                  getAlternateToggle(): jsmacros.core.MethodWrapper<any,any,boolean,any>;
                  getAlternateValues(): java.util.List<T>;
                  getDefaultValues(): java.util.List<T>;
                  getInitialValue(): T;
                  getOption(): TextHelper;
                  getValueToText(): jsmacros.core.MethodWrapper<T,any,TextHelper,any>;
                  initially(value: T): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  isOptionTextOmitted(): boolean;
                  omitTextOption(optionTextOmitted: boolean): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  option(option: string): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  option(option: TextHelper): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  valueToText(valueToText: jsmacros.core.MethodWrapper<T,any,TextHelper,any>): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  values(values: T[]): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  values(...values: T[]): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  values(defaults: T[], alternatives: T[]): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  values(defaults: java.util.List<T>, alternatives: java.util.List<T>): CyclingButtonWidgetHelper$CyclicButtonBuilder<T>;
                  _action: jsmacros.core.MethodWrapper<CyclingButtonWidgetHelper<T>,api.classes.render.IScreen,any,any>;
                  _alternateToggle: jsmacros.core.MethodWrapper<any,any,boolean,any>;
                  _alternateValues: java.util.List<T>;
                  _defaultValues: java.util.List<T>;
                  _optionText: net.minecraft.class_2561;
                  _optionTextOmitted: boolean;
                  _value: T;
                  _valueToText: jsmacros.core.MethodWrapper<T,any,TextHelper,any>;
                }
                interface CyclingButtonWidgetHelper$CyclicButtonBuilder<T> extends CombineTypes<[_CyclingButtonWidgetHelper$CyclicButtonBuilder<T>, AbstractWidgetBuilder<CyclingButtonWidgetHelper$CyclicButtonBuilder<T>,net.minecraft.class_5676<T>,CyclingButtonWidgetHelper<T>>]> {}
                interface _LockButtonWidgetHelper$$static extends ClassLike {
                  new(btn: net.minecraft.class_347): LockButtonWidgetHelper;
                  new(btn: net.minecraft.class_347, zIndex: int): LockButtonWidgetHelper;
                }
                let LockButtonWidgetHelper: _LockButtonWidgetHelper$$static;
                interface _LockButtonWidgetHelper {
                  isLocked(): boolean;
                  setLocked(locked: boolean): LockButtonWidgetHelper;
                  toString(): string;
                }
                interface LockButtonWidgetHelper extends CombineTypes<[_LockButtonWidgetHelper, ClickableWidgetHelper<LockButtonWidgetHelper,net.minecraft.class_347>]> {}
                interface _LockButtonWidgetHelper$LockButtonBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen): LockButtonWidgetHelper$LockButtonBuilder;
                }
                let LockButtonWidgetHelper$LockButtonBuilder: _LockButtonWidgetHelper$LockButtonBuilder$$static;
                interface _LockButtonWidgetHelper$LockButtonBuilder {
                  action(action: jsmacros.core.MethodWrapper<LockButtonWidgetHelper,api.classes.render.IScreen,any,any>): LockButtonWidgetHelper$LockButtonBuilder;
                  createWidget(): LockButtonWidgetHelper;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<LockButtonWidgetHelper,api.classes.render.IScreen,any,any>;
                  isLocked(): boolean;
                  locked(locked: boolean): LockButtonWidgetHelper$LockButtonBuilder;
                  _action: jsmacros.core.MethodWrapper<LockButtonWidgetHelper,api.classes.render.IScreen,any,any>;
                  _locked: boolean;
                }
                interface LockButtonWidgetHelper$LockButtonBuilder extends CombineTypes<[_LockButtonWidgetHelper$LockButtonBuilder, AbstractWidgetBuilder<LockButtonWidgetHelper$LockButtonBuilder,net.minecraft.class_347,LockButtonWidgetHelper>]> {}
                interface _ScoreboardObjectiveHelper$$static extends ClassLike {
                  _SCOREBOARD_ENTRY_COMPARATOR: java.util.Comparator<net.minecraft.class_9011>;
                  new(o: net.minecraft.class_266): ScoreboardObjectiveHelper;
                }
                let ScoreboardObjectiveHelper: _ScoreboardObjectiveHelper$$static;
                interface _ScoreboardObjectiveHelper {
                  getDisplayName(): TextHelper;
                  getKnownPlayers(): java.util.List<string>;
                  getKnownPlayersDisplayNames(): java.util.List<TextHelper>;
                  getName(): string;
                  getPlayerScores(): java.util.Map<string,int>;
                  getTexts(): java.util.List<TextHelper>;
                  scoreToDisplayName(): java.util.Map<int,TextHelper>;
                  toString(): string;
                }
                interface ScoreboardObjectiveHelper extends CombineTypes<[_ScoreboardObjectiveHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_266>]> {}
                interface _SliderWidgetHelper$$static extends ClassLike {
                  new(btn: wagyourtail.wagyourgui.elements.Slider): SliderWidgetHelper;
                  new(btn: wagyourtail.wagyourgui.elements.Slider, zIndex: int): SliderWidgetHelper;
                }
                let SliderWidgetHelper: _SliderWidgetHelper$$static;
                interface _SliderWidgetHelper {
                  getSteps(): int;
                  getValue(): double;
                  setSteps(steps: int): SliderWidgetHelper;
                  setValue(value: double): SliderWidgetHelper;
                  toString(): string;
                }
                interface SliderWidgetHelper extends CombineTypes<[_SliderWidgetHelper, ClickableWidgetHelper<SliderWidgetHelper,wagyourtail.wagyourgui.elements.Slider>]> {}
                interface _SliderWidgetHelper$SliderBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen): SliderWidgetHelper$SliderBuilder;
                }
                let SliderWidgetHelper$SliderBuilder: _SliderWidgetHelper$SliderBuilder$$static;
                interface _SliderWidgetHelper$SliderBuilder {
                  action(action: jsmacros.core.MethodWrapper<SliderWidgetHelper,api.classes.render.IScreen,any,any>): SliderWidgetHelper$SliderBuilder;
                  createWidget(): SliderWidgetHelper;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<SliderWidgetHelper,api.classes.render.IScreen,any,any>;
                  getSteps(): int;
                  getValue(): int;
                  initially(value: int): SliderWidgetHelper$SliderBuilder;
                  steps(steps: int): SliderWidgetHelper$SliderBuilder;
                  _action: jsmacros.core.MethodWrapper<SliderWidgetHelper,api.classes.render.IScreen,any,any>;
                  _steps: int;
                  _value: int;
                }
                interface SliderWidgetHelper$SliderBuilder extends CombineTypes<[_SliderWidgetHelper$SliderBuilder, AbstractWidgetBuilder<SliderWidgetHelper$SliderBuilder,wagyourtail.wagyourgui.elements.Slider,SliderWidgetHelper>]> {}
                interface _TextFieldWidgetHelper$$static extends ClassLike {
                  new(t: net.minecraft.class_342): TextFieldWidgetHelper;
                  new(t: net.minecraft.class_342, zIndex: int): TextFieldWidgetHelper;
                }
                let TextFieldWidgetHelper: _TextFieldWidgetHelper$$static;
                interface _TextFieldWidgetHelper {
                  getMaxLength(): int;
                  getSelectedText(): string;
                  getText(): string;
                  isEditable(): boolean;
                  resetTextPredicate(): TextFieldWidgetHelper;
                  setCursorPosition(position: int): TextFieldWidgetHelper;
                  setCursorPosition(position: int, shift: boolean): TextFieldWidgetHelper;
                  setCursorToEnd(): TextFieldWidgetHelper;
                  setCursorToEnd(shift: boolean): TextFieldWidgetHelper;
                  setCursorToStart(): TextFieldWidgetHelper;
                  setCursorToStart(shift: boolean): TextFieldWidgetHelper;
                  setEditable(edit: boolean): TextFieldWidgetHelper;
                  setEditableColor(color: int): TextFieldWidgetHelper;
                  setMaxLength(length: int): TextFieldWidgetHelper;
                  setSelection(start: int, end: int): TextFieldWidgetHelper;
                  setSuggestion(suggestion: string): TextFieldWidgetHelper;
                  setText(text: string): TextFieldWidgetHelper;
                  setText(text: string, await: boolean): TextFieldWidgetHelper;
                  setTextPredicate(predicate: jsmacros.core.MethodWrapper<string,any,any,any>): TextFieldWidgetHelper;
                  setUneditableColor(color: int): TextFieldWidgetHelper;
                  toString(): string;
                }
                interface TextFieldWidgetHelper extends CombineTypes<[_TextFieldWidgetHelper, ClickableWidgetHelper<TextFieldWidgetHelper,net.minecraft.class_342>]> {}
                interface _TextFieldWidgetHelper$TextFieldBuilder$$static extends ClassLike {
                  new(screen: api.classes.render.IScreen, textRenderer: net.minecraft.class_327): TextFieldWidgetHelper$TextFieldBuilder;
                }
                let TextFieldWidgetHelper$TextFieldBuilder: _TextFieldWidgetHelper$TextFieldBuilder$$static;
                interface _TextFieldWidgetHelper$TextFieldBuilder {
                  action(action: jsmacros.core.MethodWrapper<string,api.classes.render.IScreen,any,any>): TextFieldWidgetHelper$TextFieldBuilder;
                  createWidget(): TextFieldWidgetHelper;
                  createWidget(): ClickableWidgetHelper;
                  getAction(): jsmacros.core.MethodWrapper<string,api.classes.render.IScreen,any,any>;
                  getSuggestion(): string;
                  suggestion(suggestion: string): TextFieldWidgetHelper$TextFieldBuilder;
                  _action: jsmacros.core.MethodWrapper<string,api.classes.render.IScreen,any,any>;
                  _suggestion: string;
                  _textRenderer: net.minecraft.class_327;
                }
                interface TextFieldWidgetHelper$TextFieldBuilder extends CombineTypes<[_TextFieldWidgetHelper$TextFieldBuilder, AbstractWidgetBuilder<TextFieldWidgetHelper$TextFieldBuilder,net.minecraft.class_342,TextFieldWidgetHelper>]> {}
              }
              module world {
                module entity {
                  module specialized {
                    module boss {
                      interface _EnderDragonEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1510): EnderDragonEntityHelper;
                      }
                      let EnderDragonEntityHelper: _EnderDragonEntityHelper$$static;
                      interface _EnderDragonEntityHelper {
                        getBodyPart(index: int): EntityHelper<any>;
                        getBodyParts(): java.util.List<EntityHelper<any>>;
                        getBodyParts(name: string): java.util.List<EntityHelper<any>>;
                        getPhase(): string;
                      }
                      interface EnderDragonEntityHelper extends CombineTypes<[_EnderDragonEntityHelper, MobEntityHelper<net.minecraft.class_1510>]> {}
                      interface _WitherEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1528): WitherEntityHelper;
                      }
                      let WitherEntityHelper: _WitherEntityHelper$$static;
                      interface _WitherEntityHelper {
                        getRemainingInvulnerableTime(): int;
                        isFirstPhase(): boolean;
                        isInvulnerable(): boolean;
                        isSecondPhase(): boolean;
                      }
                      interface WitherEntityHelper extends CombineTypes<[_WitherEntityHelper, MobEntityHelper<net.minecraft.class_1528>]> {}
                    }
                    module decoration {
                      interface _ArmorStandEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1531): ArmorStandEntityHelper;
                      }
                      let ArmorStandEntityHelper: _ArmorStandEntityHelper$$static;
                      interface _ArmorStandEntityHelper {
                        getBodyRotation(): float[];
                        getHeadRotation(): float[];
                        getLeftArmRotation(): float[];
                        getLeftLegRotation(): float[];
                        getRightArmRotation(): float[];
                        getRightLegRotation(): float[];
                        hasArms(): boolean;
                        hasBasePlate(): boolean;
                        isMarker(): boolean;
                        isSmall(): boolean;
                        isVisible(): boolean;
                        _toArray(angle: net.minecraft.class_2379): float[];
                      }
                      interface ArmorStandEntityHelper extends CombineTypes<[_ArmorStandEntityHelper, LivingEntityHelper<net.minecraft.class_1531>]> {}
                      interface _EndCrystalEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1511): EndCrystalEntityHelper;
                      }
                      let EndCrystalEntityHelper: _EndCrystalEntityHelper$$static;
                      interface _EndCrystalEntityHelper {
                        getBeamTarget(): BlockPosHelper;
                        isNatural(): boolean;
                      }
                      interface EndCrystalEntityHelper extends CombineTypes<[_EndCrystalEntityHelper, EntityHelper<net.minecraft.class_1511>]> {}
                      interface _ItemFrameEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1533): ItemFrameEntityHelper;
                      }
                      let ItemFrameEntityHelper: _ItemFrameEntityHelper$$static;
                      interface _ItemFrameEntityHelper {
                        getItem(): helper.inventory.ItemStackHelper;
                        getRotation(): int;
                        isGlowingFrame(): boolean;
                      }
                      interface ItemFrameEntityHelper extends CombineTypes<[_ItemFrameEntityHelper, EntityHelper<net.minecraft.class_1533>]> {}
                      interface _PaintingEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1534): PaintingEntityHelper;
                      }
                      let PaintingEntityHelper: _PaintingEntityHelper$$static;
                      interface _PaintingEntityHelper {
                        getHeight(): int;
                        getIdentifier(): string;
                        getWidth(): int;
                      }
                      interface PaintingEntityHelper extends CombineTypes<[_PaintingEntityHelper, EntityHelper<net.minecraft.class_1534>]> {}
                    }
                    module display {
                      interface _BlockDisplayEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_8113$class_8115): BlockDisplayEntityHelper;
                      }
                      let BlockDisplayEntityHelper: _BlockDisplayEntityHelper$$static;
                      interface _BlockDisplayEntityHelper {
                        getBlockState(): BlockStateHelper;
                      }
                      interface BlockDisplayEntityHelper extends CombineTypes<[_BlockDisplayEntityHelper, DisplayEntityHelper<net.minecraft.class_8113$class_8115>]> {}
                      interface _DisplayEntityHelper$$static<T> extends ClassLike {
                        new(base: T): DisplayEntityHelper<T>;
                      }
                      let DisplayEntityHelper: _DisplayEntityHelper$$static<T>;
                      interface _DisplayEntityHelper<T> {
                        getBillboardMode(): string;
                        getBlockBrightness(): int;
                        getBrightness(): int;
                        getDisplayHeight(): float;
                        getDisplayWidth(): float;
                        getGlowColorOverride(): int;
                        getLerpProgress(delta: double): float;
                        getLerpTargetPitch(): float;
                        getLerpTargetX(): double;
                        getLerpTargetY(): double;
                        getLerpTargetYaw(): float;
                        getLerpTargetZ(): double;
                        getShadowRadius(): float;
                        getShadowStrength(): float;
                        getSkyBrightness(): int;
                        getViewRange(): float;
                        getVisibilityBoundingBox(): jsmacros.api.math.Vec3D;
                      }
                      interface DisplayEntityHelper<T> extends CombineTypes<[_DisplayEntityHelper<T>, EntityHelper<T>]> {}
                      interface _ItemDisplayEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_8113$class_8122): ItemDisplayEntityHelper;
                      }
                      let ItemDisplayEntityHelper: _ItemDisplayEntityHelper$$static;
                      interface _ItemDisplayEntityHelper {
                        getItem(): helper.inventory.ItemStackHelper;
                        getTransform(): string;
                      }
                      interface ItemDisplayEntityHelper extends CombineTypes<[_ItemDisplayEntityHelper, DisplayEntityHelper<net.minecraft.class_8113$class_8122>]> {}
                      interface _TextDisplayEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_8113$class_8123): TextDisplayEntityHelper;
                      }
                      let TextDisplayEntityHelper: _TextDisplayEntityHelper$$static;
                      interface _TextDisplayEntityHelper {
                        getData(): TextDisplayEntityHelper$TextDisplayDataHelper;
                      }
                      interface TextDisplayEntityHelper extends CombineTypes<[_TextDisplayEntityHelper, DisplayEntityHelper<net.minecraft.class_8113$class_8123>]> {}
                      interface _TextDisplayEntityHelper$TextDisplayDataHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_8113$class_8123$class_8230): TextDisplayEntityHelper$TextDisplayDataHelper;
                      }
                      let TextDisplayEntityHelper$TextDisplayDataHelper: _TextDisplayEntityHelper$TextDisplayDataHelper$$static;
                      interface _TextDisplayEntityHelper$TextDisplayDataHelper {
                        getAlignment(): string;
                        getBackgroundColor(): int;
                        getLineWidth(): int;
                        getText(): TextHelper;
                        getTextOpacity(): int;
                        hasDefaultBackgroundFlag(): boolean;
                        hasSeeThroughFlag(): boolean;
                        hasShadowFlag(): boolean;
                      }
                      interface TextDisplayEntityHelper$TextDisplayDataHelper extends CombineTypes<[_TextDisplayEntityHelper$TextDisplayDataHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_8113$class_8123$class_8230>]> {}
                    }
                    module mob {
                      interface _AbstractPiglinEntityHelper$$static<T> extends ClassLike {
                        new(base: T): AbstractPiglinEntityHelper<T>;
                      }
                      let AbstractPiglinEntityHelper: _AbstractPiglinEntityHelper$$static<T>;
                      interface _AbstractPiglinEntityHelper<T> {
                        canBeZombified(): boolean;
                      }
                      interface AbstractPiglinEntityHelper<T> extends CombineTypes<[_AbstractPiglinEntityHelper<T>, MobEntityHelper<T>]> {}
                      interface _BlazeEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1545): BlazeEntityHelper;
                      }
                      let BlazeEntityHelper: _BlazeEntityHelper$$static;
                      interface _BlazeEntityHelper {
                        isOnFire(): boolean;
                      }
                      interface BlazeEntityHelper extends CombineTypes<[_BlazeEntityHelper, MobEntityHelper<net.minecraft.class_1545>]> {}
                      interface _CreeperEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1548): CreeperEntityHelper;
                      }
                      let CreeperEntityHelper: _CreeperEntityHelper$$static;
                      interface _CreeperEntityHelper {
                        getFuseChange(): int;
                        getFuseTime(): int;
                        getMaxFuseTime(): int;
                        getRemainingFuseTime(): int;
                        isCharged(): boolean;
                        isIgnited(): boolean;
                      }
                      interface CreeperEntityHelper extends CombineTypes<[_CreeperEntityHelper, MobEntityHelper<net.minecraft.class_1548>]> {}
                      interface _DrownedEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1551): DrownedEntityHelper;
                      }
                      let DrownedEntityHelper: _DrownedEntityHelper$$static;
                      interface _DrownedEntityHelper {
                        hasNautilusShell(): boolean;
                        hasTrident(): boolean;
                      }
                      interface DrownedEntityHelper extends CombineTypes<[_DrownedEntityHelper, ZombieEntityHelper<net.minecraft.class_1551>]> {}
                      interface _EndermanEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1560): EndermanEntityHelper;
                      }
                      let EndermanEntityHelper: _EndermanEntityHelper$$static;
                      interface _EndermanEntityHelper {
                        getHeldBlock(): BlockStateHelper;
                        isHoldingBlock(): boolean;
                        isProvoked(): boolean;
                        isScreaming(): boolean;
                      }
                      interface EndermanEntityHelper extends CombineTypes<[_EndermanEntityHelper, MobEntityHelper<net.minecraft.class_1560>]> {}
                      interface _GhastEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1571): GhastEntityHelper;
                      }
                      let GhastEntityHelper: _GhastEntityHelper$$static;
                      interface _GhastEntityHelper {
                        isShooting(): boolean;
                      }
                      interface GhastEntityHelper extends CombineTypes<[_GhastEntityHelper, MobEntityHelper<net.minecraft.class_1571>]> {}
                      interface _GuardianEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1577): GuardianEntityHelper;
                      }
                      let GuardianEntityHelper: _GuardianEntityHelper$$static;
                      interface _GuardianEntityHelper {
                        getTarget(): EntityHelper<any>;
                        hasSpikesRetracted(): boolean;
                        hasTarget(): boolean;
                        isElder(): boolean;
                      }
                      interface GuardianEntityHelper extends CombineTypes<[_GuardianEntityHelper, MobEntityHelper<net.minecraft.class_1577>]> {}
                      interface _IllagerEntityHelper$$static<T> extends ClassLike {
                        new(base: T): IllagerEntityHelper<T>;
                      }
                      let IllagerEntityHelper: _IllagerEntityHelper$$static<T>;
                      interface _IllagerEntityHelper<T> {
                        getState(): string;
                        isCelebrating(): boolean;
                      }
                      interface IllagerEntityHelper<T> extends CombineTypes<[_IllagerEntityHelper<T>, MobEntityHelper<T>]> {}
                      interface _PhantomEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1593): PhantomEntityHelper;
                      }
                      let PhantomEntityHelper: _PhantomEntityHelper$$static;
                      interface _PhantomEntityHelper {
                        getSize(): int;
                      }
                      interface PhantomEntityHelper extends CombineTypes<[_PhantomEntityHelper, MobEntityHelper<net.minecraft.class_1593>]> {}
                      interface _PiglinEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_4836): PiglinEntityHelper;
                      }
                      let PiglinEntityHelper: _PiglinEntityHelper$$static;
                      interface _PiglinEntityHelper {
                        hasCrossbowReady(): boolean;
                        isAdmiring(): boolean;
                        isChargingCrossbow(): boolean;
                        isDancing(): boolean;
                        isMeleeAttacking(): boolean;
                        isWandering(): boolean;
                      }
                      interface PiglinEntityHelper extends CombineTypes<[_PiglinEntityHelper, AbstractPiglinEntityHelper<net.minecraft.class_4836>]> {}
                      interface _PillagerEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1604): PillagerEntityHelper;
                      }
                      let PillagerEntityHelper: _PillagerEntityHelper$$static;
                      interface _PillagerEntityHelper {
                        isCaptain(): boolean;
                      }
                      interface PillagerEntityHelper extends CombineTypes<[_PillagerEntityHelper, IllagerEntityHelper<net.minecraft.class_1604>]> {}
                      interface _ShulkerEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1606): ShulkerEntityHelper;
                      }
                      let ShulkerEntityHelper: _ShulkerEntityHelper$$static;
                      interface _ShulkerEntityHelper {
                        getAttachedSide(): DirectionHelper;
                        getColor(): DyeColorHelper;
                        isClosed(): boolean;
                      }
                      interface ShulkerEntityHelper extends CombineTypes<[_ShulkerEntityHelper, MobEntityHelper<net.minecraft.class_1606>]> {}
                      interface _SlimeEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1621): SlimeEntityHelper;
                      }
                      let SlimeEntityHelper: _SlimeEntityHelper$$static;
                      interface _SlimeEntityHelper {
                        getSize(): int;
                        isSmall(): boolean;
                      }
                      interface SlimeEntityHelper extends CombineTypes<[_SlimeEntityHelper, MobEntityHelper<net.minecraft.class_1621>]> {}
                      interface _SpellcastingIllagerEntityHelper$$static<T> extends ClassLike {
                        new(base: T): SpellcastingIllagerEntityHelper<T>;
                      }
                      let SpellcastingIllagerEntityHelper: _SpellcastingIllagerEntityHelper$$static<T>;
                      interface _SpellcastingIllagerEntityHelper<T> {
                        getCastedSpell(): string;
                        isCastingSpell(): boolean;
                      }
                      interface SpellcastingIllagerEntityHelper<T> extends CombineTypes<[_SpellcastingIllagerEntityHelper<T>, IllagerEntityHelper<T>]> {}
                      interface _SpiderEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1628): SpiderEntityHelper;
                      }
                      let SpiderEntityHelper: _SpiderEntityHelper$$static;
                      interface _SpiderEntityHelper {
                        isClimbing(): boolean;
                      }
                      interface SpiderEntityHelper extends CombineTypes<[_SpiderEntityHelper, MobEntityHelper<net.minecraft.class_1628>]> {}
                      interface _VexEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1634): VexEntityHelper;
                      }
                      let VexEntityHelper: _VexEntityHelper$$static;
                      interface _VexEntityHelper {
                        isCharging(): boolean;
                      }
                      interface VexEntityHelper extends CombineTypes<[_VexEntityHelper, MobEntityHelper<net.minecraft.class_1634>]> {}
                      interface _VindicatorEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1632): VindicatorEntityHelper;
                      }
                      let VindicatorEntityHelper: _VindicatorEntityHelper$$static;
                      interface _VindicatorEntityHelper {
                        isJohnny(): boolean;
                      }
                      interface VindicatorEntityHelper extends CombineTypes<[_VindicatorEntityHelper, IllagerEntityHelper<net.minecraft.class_1632>]> {}
                      interface _WardenEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_7260): WardenEntityHelper;
                      }
                      let WardenEntityHelper: _WardenEntityHelper$$static;
                      interface _WardenEntityHelper {
                        getAnger(): int;
                        isChargingSonicBoom(): boolean;
                        isDigging(): boolean;
                        isEmerging(): boolean;
                        isRoaring(): boolean;
                        isSniffing(): boolean;
                      }
                      interface WardenEntityHelper extends CombineTypes<[_WardenEntityHelper, MobEntityHelper<net.minecraft.class_7260>]> {}
                      interface _WitchEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1640): WitchEntityHelper;
                      }
                      let WitchEntityHelper: _WitchEntityHelper$$static;
                      interface _WitchEntityHelper {
                        getPotion(): helper.inventory.ItemStackHelper;
                        isDrinkingPotion(): boolean;
                      }
                      interface WitchEntityHelper extends CombineTypes<[_WitchEntityHelper, MobEntityHelper<net.minecraft.class_1640>]> {}
                      interface _ZombieEntityHelper$$static<T> extends ClassLike {
                        new(base: T): ZombieEntityHelper<T>;
                      }
                      let ZombieEntityHelper: _ZombieEntityHelper$$static<T>;
                      interface _ZombieEntityHelper<T> {
                        isConvertingToDrowned(): boolean;
                      }
                      interface ZombieEntityHelper<T> extends CombineTypes<[_ZombieEntityHelper<T>, MobEntityHelper<T>]> {}
                      interface _ZombieVillagerEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1641): ZombieVillagerEntityHelper;
                      }
                      let ZombieVillagerEntityHelper: _ZombieVillagerEntityHelper$$static;
                      interface _ZombieVillagerEntityHelper {
                        getLevel(): int;
                        getProfession(): string;
                        getVillagerBiomeType(): string;
                        isConvertingToVillager(): boolean;
                      }
                      interface ZombieVillagerEntityHelper extends CombineTypes<[_ZombieVillagerEntityHelper, ZombieEntityHelper<net.minecraft.class_1641>]> {}
                    }
                    module other {
                      interface _AreaEffectCloudEntityHelper$$static extends ClassLike {
                        new(e: net.minecraft.class_1295): AreaEffectCloudEntityHelper;
                      }
                      let AreaEffectCloudEntityHelper: _AreaEffectCloudEntityHelper$$static;
                      interface _AreaEffectCloudEntityHelper {
                        getColor(): int;
                        getParticleType(): string;
                        getRadius(): float;
                        isWaiting(): boolean;
                      }
                      interface AreaEffectCloudEntityHelper extends CombineTypes<[_AreaEffectCloudEntityHelper, EntityHelper<net.minecraft.class_1295>]> {}
                      interface _FallingBlockEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1540): FallingBlockEntityHelper;
                      }
                      let FallingBlockEntityHelper: _FallingBlockEntityHelper$$static;
                      interface _FallingBlockEntityHelper {
                        getBlockState(): BlockStateHelper;
                        getOriginBlockPos(): BlockPosHelper;
                      }
                      interface FallingBlockEntityHelper extends CombineTypes<[_FallingBlockEntityHelper, EntityHelper<net.minecraft.class_1540>]> {}
                      interface _InteractionEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_8150): InteractionEntityHelper;
                      }
                      let InteractionEntityHelper: _InteractionEntityHelper$$static;
                      interface _InteractionEntityHelper {
                        getHeight(): float;
                        getLastAttacker(): EntityHelper<any>;
                        getLastInteracted(): EntityHelper<any>;
                        getWidth(): float;
                        setCanHit(value: boolean): void;
                        shouldRespond(): boolean;
                      }
                      interface InteractionEntityHelper extends CombineTypes<[_InteractionEntityHelper, EntityHelper<net.minecraft.class_8150>]> {}
                      interface _TntEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1541): TntEntityHelper;
                      }
                      let TntEntityHelper: _TntEntityHelper$$static;
                      interface _TntEntityHelper {
                        getRemainingTime(): int;
                      }
                      interface TntEntityHelper extends CombineTypes<[_TntEntityHelper, EntityHelper<net.minecraft.class_1541>]> {}
                    }
                    module passive {
                      interface _AbstractHorseEntityHelper$$static<T> extends ClassLike {
                        new(base: T): AbstractHorseEntityHelper<T>;
                      }
                      let AbstractHorseEntityHelper: _AbstractHorseEntityHelper$$static<T>;
                      interface _AbstractHorseEntityHelper<T> {
                        canBeSaddled(): boolean;
                        canWearArmor(): boolean;
                        getHealthStat(): double;
                        getHorseJumpHeight(): double;
                        getHorseSpeed(): double;
                        getInventorySize(): int;
                        getJumpStrengthStat(): double;
                        getMaxHealthStat(): int;
                        getMaxJumpStrengthStat(): int;
                        getMaxSpeedStat(): double;
                        getMinHealthStat(): int;
                        getMinJumpStrengthStat(): double;
                        getMinSpeedStat(): double;
                        getOwner(): string;
                        getSpeedStat(): double;
                        isAngry(): boolean;
                        isBred(): boolean;
                        isEating(): boolean;
                        isSaddled(): boolean;
                        isTame(): boolean;
                      }
                      interface AbstractHorseEntityHelper<T> extends CombineTypes<[_AbstractHorseEntityHelper<T>, AnimalEntityHelper<T>]> {}
                      interface _AllayEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_7298): AllayEntityHelper;
                      }
                      let AllayEntityHelper: _AllayEntityHelper$$static;
                      interface _AllayEntityHelper {
                        canDuplicate(): boolean;
                        isDancing(): boolean;
                        isHoldingItem(): boolean;
                      }
                      interface AllayEntityHelper extends CombineTypes<[_AllayEntityHelper, MobEntityHelper<net.minecraft.class_7298>]> {}
                      interface _AnimalEntityHelper$$static<T> extends ClassLike {
                        new(base: T): AnimalEntityHelper<T>;
                      }
                      let AnimalEntityHelper: _AnimalEntityHelper$$static<T>;
                      interface _AnimalEntityHelper<T> {
                        canBreedWith(other: AnimalEntityHelper<any>): boolean;
                        isFood(item: helper.inventory.ItemHelper): boolean;
                        isFood(item: helper.inventory.ItemStackHelper): boolean;
                      }
                      interface AnimalEntityHelper<T> extends CombineTypes<[_AnimalEntityHelper<T>, MobEntityHelper<T>]> {}
                      interface _AxolotlEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_5762): AxolotlEntityHelper;
                      }
                      let AxolotlEntityHelper: _AxolotlEntityHelper$$static;
                      interface _AxolotlEntityHelper {
                        getVariantId(): int;
                        getVariantName(): string;
                        isFromBucket(): boolean;
                        isPlayingDead(): boolean;
                      }
                      interface AxolotlEntityHelper extends CombineTypes<[_AxolotlEntityHelper, AnimalEntityHelper<net.minecraft.class_5762>]> {}
                      interface _BatEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1420): BatEntityHelper;
                      }
                      let BatEntityHelper: _BatEntityHelper$$static;
                      interface _BatEntityHelper {
                        isResting(): boolean;
                      }
                      interface BatEntityHelper extends CombineTypes<[_BatEntityHelper, MobEntityHelper<net.minecraft.class_1420>]> {}
                      interface _BeeEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_4466): BeeEntityHelper;
                      }
                      let BeeEntityHelper: _BeeEntityHelper$$static;
                      interface _BeeEntityHelper {
                        hasNectar(): boolean;
                        hasStung(): boolean;
                        isAngry(): boolean;
                      }
                      interface BeeEntityHelper extends CombineTypes<[_BeeEntityHelper, AnimalEntityHelper<net.minecraft.class_4466>]> {}
                      interface _CatEntityHelper$$static extends ClassLike {
                        _mc: net.minecraft.class_310;
                        new(base: net.minecraft.class_1451): CatEntityHelper;
                      }
                      let CatEntityHelper: _CatEntityHelper$$static;
                      interface _CatEntityHelper {
                        getCollarColor(): DyeColorHelper;
                        getVariant(): string;
                        isSleeping(): boolean;
                      }
                      interface CatEntityHelper extends CombineTypes<[_CatEntityHelper, TameableEntityHelper<net.minecraft.class_1451>]> {}
                      interface _DolphinEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1433): DolphinEntityHelper;
                      }
                      let DolphinEntityHelper: _DolphinEntityHelper$$static;
                      interface _DolphinEntityHelper {
                        getMoistness(): int;
                        getTreasurePos(): BlockPosHelper;
                        hasFish(): boolean;
                      }
                      interface DolphinEntityHelper extends CombineTypes<[_DolphinEntityHelper, MobEntityHelper<net.minecraft.class_1433>]> {}
                      interface _DonkeyEntityHelper$$static<T> extends ClassLike {
                        new(base: T): DonkeyEntityHelper<T>;
                      }
                      let DonkeyEntityHelper: _DonkeyEntityHelper$$static<T>;
                      interface _DonkeyEntityHelper<T> {
                        hasChest(): boolean;
                      }
                      interface DonkeyEntityHelper<T> extends CombineTypes<[_DonkeyEntityHelper<T>, AbstractHorseEntityHelper<T>]> {}
                      interface _FishEntityHelper$$static<T> extends ClassLike {
                        new(base: T): FishEntityHelper<T>;
                      }
                      let FishEntityHelper: _FishEntityHelper$$static<T>;
                      interface _FishEntityHelper<T> {
                        isFromBucket(): boolean;
                      }
                      interface FishEntityHelper<T> extends CombineTypes<[_FishEntityHelper<T>, MobEntityHelper<T>]> {}
                      interface _FoxEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_4019): FoxEntityHelper;
                      }
                      let FoxEntityHelper: _FoxEntityHelper$$static;
                      interface _FoxEntityHelper {
                        canTrust(entity: EntityHelper<any>): boolean;
                        getItemInMouth(): helper.inventory.ItemStackHelper;
                        getOwner(): string;
                        getSecondOwner(): string;
                        hasFoundTarget(): boolean;
                        isDefending(): boolean;
                        isJumping(): boolean;
                        isPouncing(): boolean;
                        isRedFox(): boolean;
                        isSitting(): boolean;
                        isSleeping(): boolean;
                        isSneaking(): boolean;
                        isSnowFox(): boolean;
                        isWandering(): boolean;
                      }
                      interface FoxEntityHelper extends CombineTypes<[_FoxEntityHelper, AnimalEntityHelper<net.minecraft.class_4019>]> {}
                      interface _FrogEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_7102): FrogEntityHelper;
                      }
                      let FrogEntityHelper: _FrogEntityHelper$$static;
                      interface _FrogEntityHelper {
                        getTarget(): EntityHelper<any>;
                        getVariant(): string;
                        isCroaking(): boolean;
                        _mc: net.minecraft.class_310;
                      }
                      interface FrogEntityHelper extends CombineTypes<[_FrogEntityHelper, AnimalEntityHelper<net.minecraft.class_7102>]> {}
                      interface _GoatEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_6053): GoatEntityHelper;
                      }
                      let GoatEntityHelper: _GoatEntityHelper$$static;
                      interface _GoatEntityHelper {
                        hasHorns(): boolean;
                        hasLeftHorn(): boolean;
                        hasRightHorn(): boolean;
                        isScreaming(): boolean;
                      }
                      interface GoatEntityHelper extends CombineTypes<[_GoatEntityHelper, AnimalEntityHelper<net.minecraft.class_6053>]> {}
                      interface _HorseEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1498): HorseEntityHelper;
                      }
                      let HorseEntityHelper: _HorseEntityHelper$$static;
                      interface _HorseEntityHelper {
                        getVariant(): int;
                      }
                      interface HorseEntityHelper extends CombineTypes<[_HorseEntityHelper, AbstractHorseEntityHelper<net.minecraft.class_1498>]> {}
                      interface _IronGolemEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1439): IronGolemEntityHelper;
                      }
                      let IronGolemEntityHelper: _IronGolemEntityHelper$$static;
                      interface _IronGolemEntityHelper {
                        isPlayerCreated(): boolean;
                      }
                      interface IronGolemEntityHelper extends CombineTypes<[_IronGolemEntityHelper, MobEntityHelper<net.minecraft.class_1439>]> {}
                      interface _LlamaEntityHelper$$static<T> extends ClassLike {
                        new(base: T): LlamaEntityHelper<T>;
                      }
                      let LlamaEntityHelper: _LlamaEntityHelper$$static<T>;
                      interface _LlamaEntityHelper<T> {
                        getStrength(): int;
                        getVariant(): string;
                        isTraderLlama(): boolean;
                      }
                      interface LlamaEntityHelper<T> extends CombineTypes<[_LlamaEntityHelper<T>, DonkeyEntityHelper<T>]> {}
                      interface _MooshroomEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1438): MooshroomEntityHelper;
                      }
                      let MooshroomEntityHelper: _MooshroomEntityHelper$$static;
                      interface _MooshroomEntityHelper {
                        isBrown(): boolean;
                        isRed(): boolean;
                        isShearable(): boolean;
                      }
                      interface MooshroomEntityHelper extends CombineTypes<[_MooshroomEntityHelper, AnimalEntityHelper<net.minecraft.class_1438>]> {}
                      interface _OcelotEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_3701): OcelotEntityHelper;
                      }
                      let OcelotEntityHelper: _OcelotEntityHelper$$static;
                      interface _OcelotEntityHelper {
                        isTrusting(): boolean;
                      }
                      interface OcelotEntityHelper extends CombineTypes<[_OcelotEntityHelper, AnimalEntityHelper<net.minecraft.class_3701>]> {}
                      interface _PandaEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1440): PandaEntityHelper;
                      }
                      let PandaEntityHelper: _PandaEntityHelper$$static;
                      interface _PandaEntityHelper {
                        getHiddenGene(): int;
                        getHiddenGeneName(): string;
                        getMainGene(): int;
                        getMainGeneName(): string;
                        isAttacking(): boolean;
                        isBrown(): boolean;
                        isHiddenGeneRecessive(): boolean;
                        isIdle(): boolean;
                        isLazy(): boolean;
                        isLyingOnBack(): boolean;
                        isMainGeneRecessive(): boolean;
                        isPlayful(): boolean;
                        isPlaying(): boolean;
                        isScaredByThunderstorm(): boolean;
                        isSitting(): boolean;
                        isSneezing(): boolean;
                        isWeak(): boolean;
                        isWorried(): boolean;
                      }
                      interface PandaEntityHelper extends CombineTypes<[_PandaEntityHelper, AnimalEntityHelper<net.minecraft.class_1440>]> {}
                      interface _ParrotEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1453): ParrotEntityHelper;
                      }
                      let ParrotEntityHelper: _ParrotEntityHelper$$static;
                      interface _ParrotEntityHelper {
                        getVariant(): string;
                        isFlying(): boolean;
                        isPartying(): boolean;
                        isSitting(): boolean;
                        isSittingOnShoulder(): boolean;
                        isStanding(): boolean;
                      }
                      interface ParrotEntityHelper extends CombineTypes<[_ParrotEntityHelper, TameableEntityHelper<net.minecraft.class_1453>]> {}
                      interface _PigEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1452): PigEntityHelper;
                      }
                      let PigEntityHelper: _PigEntityHelper$$static;
                      interface _PigEntityHelper {
                        isSaddled(): boolean;
                      }
                      interface PigEntityHelper extends CombineTypes<[_PigEntityHelper, AnimalEntityHelper<net.minecraft.class_1452>]> {}
                      interface _PolarBearEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1456): PolarBearEntityHelper;
                      }
                      let PolarBearEntityHelper: _PolarBearEntityHelper$$static;
                      interface _PolarBearEntityHelper {
                        isAttacking(): boolean;
                      }
                      interface PolarBearEntityHelper extends CombineTypes<[_PolarBearEntityHelper, AnimalEntityHelper<net.minecraft.class_1456>]> {}
                      interface _PufferfishEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1454): PufferfishEntityHelper;
                      }
                      let PufferfishEntityHelper: _PufferfishEntityHelper$$static;
                      interface _PufferfishEntityHelper {
                        getSize(): int;
                      }
                      interface PufferfishEntityHelper extends CombineTypes<[_PufferfishEntityHelper, FishEntityHelper<net.minecraft.class_1454>]> {}
                      interface _RabbitEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1463): RabbitEntityHelper;
                      }
                      let RabbitEntityHelper: _RabbitEntityHelper$$static;
                      interface _RabbitEntityHelper {
                        getVariant(): string;
                        isKillerBunny(): boolean;
                      }
                      interface RabbitEntityHelper extends CombineTypes<[_RabbitEntityHelper, AnimalEntityHelper<net.minecraft.class_1463>]> {}
                      interface _SheepEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1472): SheepEntityHelper;
                      }
                      let SheepEntityHelper: _SheepEntityHelper$$static;
                      interface _SheepEntityHelper {
                        getColor(): DyeColorHelper;
                        isJeb(): boolean;
                        isShearable(): boolean;
                        isSheared(): boolean;
                      }
                      interface SheepEntityHelper extends CombineTypes<[_SheepEntityHelper, AnimalEntityHelper<net.minecraft.class_1472>]> {}
                      interface _SnowGolemEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1473): SnowGolemEntityHelper;
                      }
                      let SnowGolemEntityHelper: _SnowGolemEntityHelper$$static;
                      interface _SnowGolemEntityHelper {
                        hasPumpkin(): boolean;
                        isShearable(): boolean;
                      }
                      interface SnowGolemEntityHelper extends CombineTypes<[_SnowGolemEntityHelper, MobEntityHelper<net.minecraft.class_1473>]> {}
                      interface _StriderEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_4985): StriderEntityHelper;
                      }
                      let StriderEntityHelper: _StriderEntityHelper$$static;
                      interface _StriderEntityHelper {
                        isSaddled(): boolean;
                        isShivering(): boolean;
                      }
                      interface StriderEntityHelper extends CombineTypes<[_StriderEntityHelper, AnimalEntityHelper<net.minecraft.class_4985>]> {}
                      interface _TameableEntityHelper$$static<T> extends ClassLike {
                        new(base: T): TameableEntityHelper<T>;
                      }
                      let TameableEntityHelper: _TameableEntityHelper$$static<T>;
                      interface _TameableEntityHelper<T> {
                        getOwner(): string;
                        isOwner(owner: LivingEntityHelper<any>): boolean;
                        isSitting(): boolean;
                        isTamed(): boolean;
                      }
                      interface TameableEntityHelper<T> extends CombineTypes<[_TameableEntityHelper<T>, AnimalEntityHelper<T>]> {}
                      interface _TropicalFishEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1474): TropicalFishEntityHelper;
                      }
                      let TropicalFishEntityHelper: _TropicalFishEntityHelper$$static;
                      interface _TropicalFishEntityHelper {
                        getBaseColor(): int;
                        getPatternColor(): int;
                        getSize(): string;
                        getVariant(): string;
                        getVarietyId(): int;
                      }
                      interface TropicalFishEntityHelper extends CombineTypes<[_TropicalFishEntityHelper, FishEntityHelper<net.minecraft.class_1474>]> {}
                      interface _WolfEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1493): WolfEntityHelper;
                      }
                      let WolfEntityHelper: _WolfEntityHelper$$static;
                      interface _WolfEntityHelper {
                        getCollarColor(): DyeColorHelper;
                        isAngry(): boolean;
                        isBegging(): boolean;
                        isWet(): boolean;
                      }
                      interface WolfEntityHelper extends CombineTypes<[_WolfEntityHelper, TameableEntityHelper<net.minecraft.class_1493>]> {}
                    }
                    module projectile {
                      interface _ArrowEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1665): ArrowEntityHelper;
                      }
                      let ArrowEntityHelper: _ArrowEntityHelper$$static;
                      interface _ArrowEntityHelper {
                        getColor(): int;
                        getPiercingLevel(): int;
                        isCritical(): boolean;
                      }
                      interface ArrowEntityHelper extends CombineTypes<[_ArrowEntityHelper, EntityHelper<net.minecraft.class_1665>]> {}
                      interface _FishingBobberEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1536): FishingBobberEntityHelper;
                      }
                      let FishingBobberEntityHelper: _FishingBobberEntityHelper$$static;
                      interface _FishingBobberEntityHelper {
                        getHookedEntity(): EntityHelper<any>;
                        hasCaughtFish(): boolean;
                        hasEntityHooked(): boolean;
                        isInOpenWater(): boolean;
                      }
                      interface FishingBobberEntityHelper extends CombineTypes<[_FishingBobberEntityHelper, EntityHelper<net.minecraft.class_1536>]> {}
                      interface _TridentEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1685): TridentEntityHelper;
                      }
                      let TridentEntityHelper: _TridentEntityHelper$$static;
                      interface _TridentEntityHelper {
                        hasLoyalty(): boolean;
                        isEnchanted(): boolean;
                      }
                      interface TridentEntityHelper extends CombineTypes<[_TridentEntityHelper, EntityHelper<net.minecraft.class_1685>]> {}
                      interface _WitherSkullEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1687): WitherSkullEntityHelper;
                      }
                      let WitherSkullEntityHelper: _WitherSkullEntityHelper$$static;
                      interface _WitherSkullEntityHelper {
                        isCharged(): boolean;
                      }
                      interface WitherSkullEntityHelper extends CombineTypes<[_WitherSkullEntityHelper, EntityHelper<net.minecraft.class_1687>]> {}
                    }
                    module vehicle {
                      interface _BoatEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_10255): BoatEntityHelper;
                      }
                      let BoatEntityHelper: _BoatEntityHelper$$static;
                      interface _BoatEntityHelper {
                        getBoatItem(): helper.inventory.ItemStackHelper;
                        _getLocation(): net.minecraft.class_10255$class_1691;
                        isChestBoat(): boolean;
                        isInAir(): boolean;
                        isInWater(): boolean;
                        isOnLand(): boolean;
                        isUnderwater(): boolean;
                      }
                      interface BoatEntityHelper extends CombineTypes<[_BoatEntityHelper, EntityHelper<net.minecraft.class_10255>]> {}
                      interface _FurnaceMinecartEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1696): FurnaceMinecartEntityHelper;
                      }
                      let FurnaceMinecartEntityHelper: _FurnaceMinecartEntityHelper$$static;
                      interface _FurnaceMinecartEntityHelper {
                        isPowered(): boolean;
                      }
                      interface FurnaceMinecartEntityHelper extends CombineTypes<[_FurnaceMinecartEntityHelper, EntityHelper<net.minecraft.class_1696>]> {}
                      interface _TntMinecartEntityHelper$$static extends ClassLike {
                        new(base: net.minecraft.class_1701): TntMinecartEntityHelper;
                      }
                      let TntMinecartEntityHelper: _TntMinecartEntityHelper$$static;
                      interface _TntMinecartEntityHelper {
                        getRemainingTime(): int;
                        isPrimed(): boolean;
                      }
                      interface TntMinecartEntityHelper extends CombineTypes<[_TntMinecartEntityHelper, EntityHelper<net.minecraft.class_1701>]> {}
                    }
                  }
                  interface _BossBarHelper$$static extends ClassLike {
                    new(b: net.minecraft.class_1259): BossBarHelper;
                  }
                  let BossBarHelper: _BossBarHelper$$static;
                  interface _BossBarHelper {
                    getColor(): string;
                    getColorFormat(): FormattingHelper;
                    getColorValue(): int;
                    getName(): TextHelper;
                    getPercent(): float;
                    getStyle(): string;
                    getUUID(): string;
                    toString(): string;
                  }
                  interface BossBarHelper extends CombineTypes<[_BossBarHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1259>]> {}
                  interface _ClientPlayerEntityHelper$$static<T> extends ClassLike {
                    new(e: T): ClientPlayerEntityHelper<T>;
                  }
                  let ClientPlayerEntityHelper: _ClientPlayerEntityHelper$$static<T>;
                  interface _ClientPlayerEntityHelper<T> {
                    addPos(pos: jsmacros.api.math.Pos3D): ClientPlayerEntityHelper<T>;
                    addPos(pos: jsmacros.api.math.Pos3D, await: boolean): ClientPlayerEntityHelper<T>;
                    addPos(x: double, a1: double, y: double): ClientPlayerEntityHelper<T>;
                    addPos(x: double, a1: double, y: double, a3: boolean): ClientPlayerEntityHelper<T>;
                    _addVelocity(velocity: net.minecraft.class_243): ClientPlayerEntityHelper<T>;
                    addVelocity(velocity: jsmacros.api.math.Pos3D): ClientPlayerEntityHelper<T>;
                    addVelocity(x: double, a1: double, y: double): ClientPlayerEntityHelper<T>;
                    attack(entity: EntityHelper<any>): ClientPlayerEntityHelper<T>;
                    attack(entity: EntityHelper<any>, await: boolean): ClientPlayerEntityHelper<T>;
                    attack(x: int, y: int, z: int, direction: string): ClientPlayerEntityHelper<T>;
                    attack(x: int, y: int, z: int, direction: int): ClientPlayerEntityHelper<T>;
                    attack(x: int, y: int, z: int, direction: string, await: boolean): ClientPlayerEntityHelper<T>;
                    attack(x: int, y: int, z: int, direction: int, await: boolean): ClientPlayerEntityHelper<T>;
                    _attack(x: int, y: int, z: int, direction: net.minecraft.class_2350, await: boolean): ClientPlayerEntityHelper<T>;
                    attack(): ClientPlayerEntityHelper<T>;
                    attack(await: boolean): ClientPlayerEntityHelper<T>;
                    calculateMiningSpeed(block: BlockStateHelper): int;
                    calculateMiningSpeed(usedItem: helper.inventory.ItemStackHelper, blockState: BlockStateHelper): int;
                    dropHeldItem(dropStack: boolean): ClientPlayerEntityHelper<any>;
                    getAdvancementManager(): AdvancementManagerHelper;
                    getFoodLevel(): int;
                    getItemCooldownRemainingTicks(item: string): int;
                    getItemCooldownsRemainingTicks(): java.util.Map<string,int>;
                    getSaturation(): float;
                    getTicksSinceCooldownStart(item: string): int;
                    getTicksSinceCooldownsStart(): java.util.Map<string,int>;
                    interact(): ClientPlayerEntityHelper<T>;
                    interact(await: boolean): ClientPlayerEntityHelper<T>;
                    interactBlock(x: int, y: int, z: int, direction: string, offHand: boolean): ClientPlayerEntityHelper<T>;
                    interactBlock(x: int, y: int, z: int, direction: int, offHand: boolean): ClientPlayerEntityHelper<T>;
                    interactBlock(x: int, y: int, z: int, direction: string, offHand: boolean, await: boolean): ClientPlayerEntityHelper<T>;
                    interactBlock(x: int, y: int, z: int, direction: int, offHand: boolean, await: boolean): ClientPlayerEntityHelper<T>;
                    interactBlock(x: int, y: int, z: int, direction: net.minecraft.class_2350, offHand: boolean, await: boolean): ClientPlayerEntityHelper<T>;
                    interactEntity(entity: EntityHelper<any>, offHand: boolean): ClientPlayerEntityHelper<T>;
                    interactEntity(entity: EntityHelper<any>, offHand: boolean, await: boolean): ClientPlayerEntityHelper<T>;
                    interactItem(offHand: boolean): ClientPlayerEntityHelper<T>;
                    interactItem(offHand: boolean, await: boolean): ClientPlayerEntityHelper<T>;
                    lookAt(direction: string): ClientPlayerEntityHelper<T>;
                    lookAt(yaw: double, a1: double): ClientPlayerEntityHelper<T>;
                    lookAt(x: double, a1: double, y: double): ClientPlayerEntityHelper<T>;
                    setLongAttack(stop: boolean): ClientPlayerEntityHelper<T>;
                    setLongInteract(stop: boolean): ClientPlayerEntityHelper<T>;
                    _setPos(pos: net.minecraft.class_243, await: boolean): ClientPlayerEntityHelper<T>;
                    setPos(pos: jsmacros.api.math.Pos3D): ClientPlayerEntityHelper<T>;
                    setPos(pos: jsmacros.api.math.Pos3D, await: boolean): ClientPlayerEntityHelper<T>;
                    setPos(x: double, a1: double, y: double): ClientPlayerEntityHelper<T>;
                    setPos(x: double, a1: double, y: double, a3: boolean): ClientPlayerEntityHelper<T>;
                    _setVelocity(velocity: net.minecraft.class_243): ClientPlayerEntityHelper<T>;
                    setVelocity(velocity: jsmacros.api.math.Pos3D): ClientPlayerEntityHelper<T>;
                    setVelocity(x: double, a1: double, y: double): ClientPlayerEntityHelper<T>;
                    tryLookAt(x: int, y: int, z: int): boolean;
                    tryLookAt(pos: BlockPosHelper): boolean;
                    turnBack(): ClientPlayerEntityHelper<T>;
                    turnLeft(): ClientPlayerEntityHelper<T>;
                    turnRight(): ClientPlayerEntityHelper<T>;
                    _mc: net.minecraft.class_310;
                  }
                  interface ClientPlayerEntityHelper<T> extends CombineTypes<[_ClientPlayerEntityHelper<T>, PlayerEntityHelper<T>]> {}
                  interface _EntityHelper$$static<T> extends ClassLike {
                    create(e: net.minecraft.class_1297): EntityHelper<any>;
                    _new(e: T): EntityHelper<T>;
                  }
                  let EntityHelper: _EntityHelper$$static<T>;
                  interface _EntityHelper<T> {
                    asAnimal(): LivingEntityHelper<any>;
                    asClientPlayer(): ClientPlayerEntityHelper<any>;
                    asItem(): ItemEntityHelper;
                    asLiving(): LivingEntityHelper<any>;
                    asMerchant(): MerchantEntityHelper<any>;
                    asPlayer(): PlayerEntityHelper<any>;
                    asServerEntity(): EntityHelper<any>;
                    asVillager(): VillagerEntityHelper;
                    distanceTo(entity: EntityHelper<any>): float;
                    distanceTo(pos: BlockPosHelper): double;
                    distanceTo(pos: jsmacros.api.math.Pos3D): double;
                    distanceTo(x: double, a1: double, y: double): double;
                    getAir(): int;
                    getBiome(): string;
                    getBlockPos(): BlockPosHelper;
                    getChunk(): ChunkHelper;
                    getChunkPos(): jsmacros.api.math.Pos2D;
                    getEyeHeight(): double;
                    getEyePos(): jsmacros.api.math.Pos3D;
                    getFacingDirection(): DirectionHelper;
                    getGlowingColor(): int;
                    getMaxAir(): int;
                    getNBT(): NBTElementHelper$NBTCompoundHelper;
                    getName(): TextHelper;
                    getPassengers(): java.util.List<EntityHelper<any>>;
                    getPitch(): float;
                    getPos(): jsmacros.api.math.Pos3D;
                    getSpeed(): double;
                    getType(): string;
                    getUUID(): string;
                    getVehicle(): EntityHelper<any>;
                    getVelocity(): jsmacros.api.math.Pos3D;
                    getX(): double;
                    getY(): double;
                    getYaw(): float;
                    getZ(): double;
                    is(types: string[]): boolean;
                    is(...types: string[]): boolean;
                    isAlive(): boolean;
                    isGlowing(): boolean;
                    isInLava(): boolean;
                    isOnFire(): boolean;
                    isSneaking(): boolean;
                    isSprinting(): boolean;
                    rayTraceBlock(distance: double, a1: boolean): BlockDataHelper;
                    rayTraceEntity(distance: int): EntityHelper<any>;
                    resetGlowing(): EntityHelper<T>;
                    resetGlowingColor(): EntityHelper<T>;
                    setCustomName(name: TextHelper): EntityHelper<T>;
                    setCustomNameVisible(b: boolean): EntityHelper<T>;
                    setGlowing(val: boolean): EntityHelper<T>;
                    setGlowingColor(color: int): EntityHelper<T>;
                    toString(): string;
                  }
                  interface EntityHelper<T> extends CombineTypes<[_EntityHelper<T>, jsmacros.core.helpers.BaseHelper<T>]> {}
                  interface _ItemEntityHelper$$static extends ClassLike {
                    new(e: net.minecraft.class_1542): ItemEntityHelper;
                  }
                  let ItemEntityHelper: _ItemEntityHelper$$static;
                  interface _ItemEntityHelper {
                    getContainedItemStack(): helper.inventory.ItemStackHelper;
                    toString(): string;
                  }
                  interface ItemEntityHelper extends CombineTypes<[_ItemEntityHelper, EntityHelper<net.minecraft.class_1542>]> {}
                  interface _LivingEntityHelper$$static<T> extends ClassLike {
                    new(e: T): LivingEntityHelper<T>;
                  }
                  let LivingEntityHelper: _LivingEntityHelper$$static<T>;
                  interface _LivingEntityHelper<T> {
                    canBreatheInWater(): boolean;
                    _canHaveStatusEffect(effect: net.minecraft.class_1293): boolean;
                    canHaveStatusEffect(effect: StatusEffectHelper): boolean;
                    canSeeEntity(entity: EntityHelper<any>): boolean;
                    canSeeEntity(entity: EntityHelper<any>, simpleCast: boolean): boolean;
                    canTakeDamage(): boolean;
                    _canTarget(target: net.minecraft.class_1309): boolean;
                    canTarget(target: LivingEntityHelper<any>): boolean;
                    getAbsorptionHealth(): float;
                    getArmor(): int;
                    getBowPullProgress(): double;
                    getChestArmor(): helper.inventory.ItemStackHelper;
                    getDefaultHealth(): int;
                    getFootArmor(): helper.inventory.ItemStackHelper;
                    getHeadArmor(): helper.inventory.ItemStackHelper;
                    getHealth(): float;
                    getItemUseTimeLeft(): int;
                    getLegArmor(): helper.inventory.ItemStackHelper;
                    getMainHand(): helper.inventory.ItemStackHelper;
                    getMaxHealth(): float;
                    getMobTags(): java.util.List<string>;
                    getOffHand(): helper.inventory.ItemStackHelper;
                    getStatusEffects(): java.util.List<StatusEffectHelper>;
                    hasNoDrag(): boolean;
                    hasNoGravity(): boolean;
                    hasStatusEffect(id: string): boolean;
                    isBaby(): boolean;
                    isFallFlying(): boolean;
                    isHolding(item: string): boolean;
                    isOnGround(): boolean;
                    isPartOfGame(): boolean;
                    isSleeping(): boolean;
                    isSpectator(): boolean;
                    isUndead(): boolean;
                  }
                  interface LivingEntityHelper<T> extends CombineTypes<[_LivingEntityHelper<T>, EntityHelper<T>]> {}
                  interface _MerchantEntityHelper$$static<T> extends ClassLike {
                    new(e: T): MerchantEntityHelper<T>;
                  }
                  let MerchantEntityHelper: _MerchantEntityHelper$$static<T>;
                  interface _MerchantEntityHelper<T> {
                    getExperience(): int;
                    getTrades(): java.util.List<TradeOfferHelper>;
                    hasCustomer(): boolean;
                    refreshTrades(): java.util.List<TradeOfferHelper>;
                  }
                  interface MerchantEntityHelper<T> extends CombineTypes<[_MerchantEntityHelper<T>, LivingEntityHelper<T>]> {}
                  interface _MobEntityHelper$$static<T> extends ClassLike {
                    new(base: T): MobEntityHelper<T>;
                  }
                  let MobEntityHelper: _MobEntityHelper$$static<T>;
                  interface _MobEntityHelper<T> {
                    isAiDisabled(): boolean;
                    isAttacking(): boolean;
                  }
                  interface MobEntityHelper<T> extends CombineTypes<[_MobEntityHelper<T>, LivingEntityHelper<T>]> {}
                  interface _PlayerAbilitiesHelper$$static extends ClassLike {
                    new(a: net.minecraft.class_1656): PlayerAbilitiesHelper;
                  }
                  let PlayerAbilitiesHelper: _PlayerAbilitiesHelper$$static;
                  interface _PlayerAbilitiesHelper {
                    canModifyWorld(): boolean;
                    getAllowFlying(): boolean;
                    getCreativeMode(): boolean;
                    getFlySpeed(): float;
                    getFlying(): boolean;
                    getInvulnerable(): boolean;
                    getWalkSpeed(): float;
                    setAllowFlying(b: boolean): PlayerAbilitiesHelper;
                    setFlySpeed(flySpeed: double): PlayerAbilitiesHelper;
                    setFlying(b: boolean): PlayerAbilitiesHelper;
                    setWalkSpeed(speed: double): PlayerAbilitiesHelper;
                    toString(): string;
                  }
                  interface PlayerAbilitiesHelper extends CombineTypes<[_PlayerAbilitiesHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1656>]> {}
                  interface _PlayerEntityHelper$$static<T> extends ClassLike {
                    new(e: T): PlayerEntityHelper<T>;
                  }
                  let PlayerEntityHelper: _PlayerEntityHelper$$static<T>;
                  interface _PlayerEntityHelper<T> {
                    getAbilities(): PlayerAbilitiesHelper;
                    getAttackCooldownProgress(): float;
                    getAttackCooldownProgressPerTick(): float;
                    getChestArmor(): helper.inventory.ItemStackHelper;
                    getFishingBobber(): entity.specialized.projectile.FishingBobberEntityHelper;
                    getFootArmor(): helper.inventory.ItemStackHelper;
                    getHeadArmor(): helper.inventory.ItemStackHelper;
                    getLegArmor(): helper.inventory.ItemStackHelper;
                    getMainHand(): helper.inventory.ItemStackHelper;
                    getOffHand(): helper.inventory.ItemStackHelper;
                    getPlayerName(): string;
                    getScore(): int;
                    getXP(): int;
                    getXPLevel(): int;
                    getXPProgress(): float;
                    getXPToLevelUp(): int;
                    isSleeping(): boolean;
                    isSleepingLongEnough(): boolean;
                  }
                  interface PlayerEntityHelper<T> extends CombineTypes<[_PlayerEntityHelper<T>, LivingEntityHelper<T>]> {}
                  interface _TradeOfferHelper$$static extends ClassLike {
                    new(base: net.minecraft.class_1914, index: int, inv: api.classes.inventory.VillagerInventory): TradeOfferHelper;
                  }
                  let TradeOfferHelper: _TradeOfferHelper$$static;
                  interface _TradeOfferHelper {
                    getAdjustedPrice(): int;
                    getCurrentPriceAdjustment(): int;
                    getDemandBonus(): int;
                    getExperience(): int;
                    getIndex(): int;
                    getInput(): java.util.List<helper.inventory.ItemStackHelper>;
                    getLeftInput(): helper.inventory.ItemStackHelper;
                    getMaxUses(): int;
                    getNBT(): NBTElementHelper<any>;
                    getOriginalFirstInput(): helper.inventory.ItemStackHelper;
                    getOriginalPrice(): int;
                    getOutput(): helper.inventory.ItemStackHelper;
                    getPriceMultiplier(): float;
                    getRightInput(): helper.inventory.ItemStackHelper;
                    getSpecialPrice(): int;
                    getUses(): int;
                    isAvailable(): boolean;
                    select(): TradeOfferHelper;
                    shouldRewardPlayerExperience(): boolean;
                    toString(): string;
                    _index: int;
                    _inv: api.classes.inventory.VillagerInventory;
                  }
                  interface TradeOfferHelper extends CombineTypes<[_TradeOfferHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1914>]> {}
                  interface _VillagerEntityHelper$$static extends ClassLike {
                    new(e: net.minecraft.class_1646): VillagerEntityHelper;
                  }
                  let VillagerEntityHelper: _VillagerEntityHelper$$static;
                  interface _VillagerEntityHelper {
                    getLevel(): int;
                    getProfession(): string;
                    getStyle(): string;
                  }
                  interface VillagerEntityHelper extends CombineTypes<[_VillagerEntityHelper, MerchantEntityHelper<net.minecraft.class_1646>]> {}
                }
                interface _BlockDataHelper$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(b: net.minecraft.class_2680, e: net.minecraft.class_2586, bp: net.minecraft.class_2338): BlockDataHelper;
                }
                let BlockDataHelper: _BlockDataHelper$$static;
                interface _BlockDataHelper {
                  getBlock(): BlockHelper;
                  getBlockHelper(): BlockHelper;
                  getBlockPos(): BlockPosHelper;
                  getBlockState(): java.util.Map<string,string>;
                  getBlockStateHelper(): BlockStateHelper;
                  getId(): string;
                  getNBT(): NBTElementHelper$NBTCompoundHelper;
                  getName(): TextHelper;
                  getRawBlock(): net.minecraft.class_2248;
                  getRawBlockEntity(): net.minecraft.class_2586;
                  getRawBlockState(): net.minecraft.class_2680;
                  getX(): int;
                  getY(): int;
                  getZ(): int;
                  toString(): string;
                  _b: net.minecraft.class_2248;
                  _bp: net.minecraft.class_2338;
                  _e: net.minecraft.class_2586;
                }
                interface BlockDataHelper extends CombineTypes<[_BlockDataHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2680>]> {}
                interface _BlockHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_2248): BlockHelper;
                }
                let BlockHelper: _BlockHelper$$static;
                interface _BlockHelper {
                  canMobSpawnInside(): boolean;
                  getBlastResistance(): float;
                  getDefaultItemStack(): helper.inventory.ItemStackHelper;
                  getDefaultState(): BlockStateHelper;
                  getHardness(): float;
                  getId(): string;
                  getJumpVelocityMultiplier(): float;
                  getName(): TextHelper;
                  getSlipperiness(): float;
                  getStates(): java.util.List<BlockStateHelper>;
                  getTags(): java.util.List<string>;
                  getVelocityMultiplier(): float;
                  hasDynamicBounds(): boolean;
                  toString(): string;
                }
                interface BlockHelper extends CombineTypes<[_BlockHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2248>]> {}
                interface _BlockPosHelper$$static extends ClassLike {
                  new(b: net.minecraft.class_2338): BlockPosHelper;
                  new(x: int, y: int, z: int): BlockPosHelper;
                }
                let BlockPosHelper: _BlockPosHelper$$static;
                interface _BlockPosHelper {
                  distanceTo(entity: world.entity.EntityHelper<any>): double;
                  distanceTo(pos: BlockPosHelper): double;
                  distanceTo(pos: jsmacros.api.math.Pos3D): double;
                  distanceTo(x: double, a1: double, y: double): double;
                  down(): BlockPosHelper;
                  down(distance: int): BlockPosHelper;
                  east(): BlockPosHelper;
                  east(distance: int): BlockPosHelper;
                  equals(obj: any): boolean;
                  getX(): int;
                  getY(): int;
                  getZ(): int;
                  hashCode(): int;
                  north(): BlockPosHelper;
                  north(distance: int): BlockPosHelper;
                  offset(direction: string): BlockPosHelper;
                  offset(direction: string, distance: int): BlockPosHelper;
                  offset(x: int, y: int, z: int): BlockPosHelper;
                  south(): BlockPosHelper;
                  south(distance: int): BlockPosHelper;
                  toNetherCoords(): BlockPosHelper;
                  toOverworldCoords(): BlockPosHelper;
                  toPos3D(): jsmacros.api.math.Pos3D;
                  toString(): string;
                  up(): BlockPosHelper;
                  up(distance: int): BlockPosHelper;
                  west(): BlockPosHelper;
                  west(distance: int): BlockPosHelper;
                }
                interface BlockPosHelper extends CombineTypes<[_BlockPosHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2338>]> {}
                interface _BlockStateHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_2680): BlockStateHelper;
                }
                let BlockStateHelper: _BlockStateHelper$$static;
                interface _BlockStateHelper {
                  allowsSpawning(pos: BlockPosHelper, entity: string): boolean;
                  blocksMovement(): boolean;
                  _create(base: net.minecraft.class_2680): StateHelper<net.minecraft.class_2680>;
                  _create(a0: net.minecraft.class_2688): StateHelper;
                  emitsRedstonePower(): boolean;
                  exceedsCube(): boolean;
                  getBlock(): BlockHelper;
                  getFluidState(): FluidStateHelper;
                  getHardness(): float;
                  getId(): string;
                  getLuminance(): int;
                  getPistonBehaviour(): string;
                  getUniversal(): UniversalBlockStateHelper;
                  hasBlockEntity(): boolean;
                  hasComparatorOutput(): boolean;
                  hasRandomTicks(): boolean;
                  isAir(): boolean;
                  isBurnable(): boolean;
                  isLiquid(): boolean;
                  isOpaque(): boolean;
                  isReplaceable(): boolean;
                  isSolid(): boolean;
                  isToolRequired(): boolean;
                  shouldSuffocate(pos: BlockPosHelper): boolean;
                  toString(): string;
                }
                interface BlockStateHelper extends CombineTypes<[_BlockStateHelper, StateHelper<net.minecraft.class_2680>]> {}
                interface _ChunkHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_2791): ChunkHelper;
                }
                let ChunkHelper: _ChunkHelper$$static;
                interface _ChunkHelper {
                  containsAll(blocks: string[]): boolean;
                  containsAll(...blocks: string[]): boolean;
                  containsAny(blocks: string[]): boolean;
                  containsAny(...blocks: string[]): boolean;
                  forEach(includeAir: boolean, callback: jsmacros.core.MethodWrapper<BlockDataHelper,any,any,any>): ChunkHelper;
                  getBiome(xOffset: int, y: int, zOffset: int): string;
                  getChunkX(): int;
                  getChunkZ(): int;
                  getEntities(): java.util.List<world.entity.EntityHelper<any>>;
                  getHeight(): int;
                  getHeightmaps(): java.util.Collection<java.util.Map$Entry<net.minecraft.class_2902$class_2903,net.minecraft.class_2902>>;
                  getInhabitedTime(): long;
                  getMaxBuildHeight(): int;
                  getMinBuildHeight(): int;
                  getMotionBlockingHeightmap(): net.minecraft.class_2902;
                  getMotionBlockingNoLeavesHeightmap(): net.minecraft.class_2902;
                  getOceanFloorHeightmap(): net.minecraft.class_2902;
                  getOffsetBlock(xOffset: int, y: int, zOffset: int): BlockPosHelper;
                  getStartingBlock(): BlockPosHelper;
                  getSurfaceHeightmap(): net.minecraft.class_2902;
                  getTileEntities(): java.util.List<BlockPosHelper>;
                  getTopYAt(xOffset: int, zOffset: int, heightmap: net.minecraft.class_2902): int;
                  toString(): string;
                }
                interface ChunkHelper extends CombineTypes<[_ChunkHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2791>]> {}
                interface _DirectionHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_2350): DirectionHelper;
                }
                let DirectionHelper: _DirectionHelper$$static;
                interface _DirectionHelper {
                  getAxis(): string;
                  getLeft(): DirectionHelper;
                  getName(): string;
                  getOpposite(): DirectionHelper;
                  getPitch(): float;
                  getRight(): DirectionHelper;
                  getVector(): jsmacros.api.math.Pos3D;
                  getYaw(): float;
                  isHorizontal(): boolean;
                  isTowardsPositive(): boolean;
                  isVertical(): boolean;
                  pointsTo(yaw: double): boolean;
                  toString(): string;
                }
                interface DirectionHelper extends CombineTypes<[_DirectionHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2350>]> {}
                interface _FluidStateHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_3610): FluidStateHelper;
                }
                let FluidStateHelper: _FluidStateHelper$$static;
                interface _FluidStateHelper {
                  _create(base: net.minecraft.class_3610): StateHelper<net.minecraft.class_3610>;
                  _create(a0: net.minecraft.class_2688): StateHelper;
                  getBlastResistance(): float;
                  getBlockState(): BlockStateHelper;
                  getHeight(): float;
                  getId(): string;
                  getLevel(): int;
                  getVelocity(pos: BlockPosHelper): jsmacros.api.math.Pos3D;
                  hasRandomTicks(): boolean;
                  isEmpty(): boolean;
                  isStill(): boolean;
                  toString(): string;
                }
                interface FluidStateHelper extends CombineTypes<[_FluidStateHelper, StateHelper<net.minecraft.class_3610>]> {}
                interface _HitResultHelper$$static<T> extends ClassLike {
                  resolve(hr: net.minecraft.class_239): HitResultHelper<any>;
                  _new(base: T): HitResultHelper<T>;
                }
                let HitResultHelper: _HitResultHelper$$static<T>;
                interface _HitResultHelper<T> {
                  asBlock(): HitResultHelper$Block;
                  asEntity(): HitResultHelper$Entity;
                  getPos(): jsmacros.api.math.Pos3D;
                  toString(): string;
                }
                interface HitResultHelper<T> extends CombineTypes<[_HitResultHelper<T>, jsmacros.core.helpers.BaseHelper<T>]> {}
                interface _HitResultHelper$Block$$static extends ClassLike {
                  new(base: net.minecraft.class_3965): HitResultHelper$Block;
                }
                let HitResultHelper$Block: _HitResultHelper$Block$$static;
                interface _HitResultHelper$Block {
                  asBlock(): HitResultHelper$Block;
                  getBlockPos(): BlockPosHelper;
                  getSide(): DirectionHelper;
                  isInsideBlock(): boolean;
                  isMissed(): boolean;
                  toString(): string;
                }
                interface HitResultHelper$Block extends CombineTypes<[_HitResultHelper$Block, HitResultHelper<net.minecraft.class_3965>]> {}
                interface _HitResultHelper$Entity$$static extends ClassLike {
                  new(base: net.minecraft.class_3966): HitResultHelper$Entity;
                }
                let HitResultHelper$Entity: _HitResultHelper$Entity$$static;
                interface _HitResultHelper$Entity {
                  asEntity(): HitResultHelper$Entity;
                  getEntity(): world.entity.EntityHelper<any>;
                  toString(): string;
                }
                interface HitResultHelper$Entity extends CombineTypes<[_HitResultHelper$Entity, HitResultHelper<net.minecraft.class_3966>]> {}
                interface _PlayerListEntryHelper$$static extends ClassLike {
                  new(p: net.minecraft.class_640): PlayerListEntryHelper;
                }
                let PlayerListEntryHelper: _PlayerListEntryHelper$$static;
                interface _PlayerListEntryHelper {
                  getCapeTexture(): string;
                  getDisplayText(): TextHelper;
                  getElytraTexture(): string;
                  getGamemode(): string;
                  getName(): string;
                  getPing(): int;
                  getPublicKey(): byte[];
                  getSkinTexture(): string;
                  getSkinUrl(): string;
                  getTeam(): TeamHelper;
                  getUUID(): string;
                  hasCape(): boolean;
                  hasSlimModel(): boolean;
                  toString(): string;
                }
                interface PlayerListEntryHelper extends CombineTypes<[_PlayerListEntryHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_640>]> {}
                interface _ScoreboardsHelper$$static extends ClassLike {
                  new(board: net.minecraft.class_269): ScoreboardsHelper;
                }
                let ScoreboardsHelper: _ScoreboardsHelper$$static;
                interface _ScoreboardsHelper {
                  getCurrentScoreboard(): helper.screen.ScoreboardObjectiveHelper;
                  getObjectiveForTeamColorIndex(index: int): helper.screen.ScoreboardObjectiveHelper;
                  getObjectiveSlot(slot: int): helper.screen.ScoreboardObjectiveHelper;
                  getPlayerTeam(p: world.entity.PlayerEntityHelper<net.minecraft.class_1657>): TeamHelper;
                  getPlayerTeam(): TeamHelper;
                  _getPlayerTeam(p: net.minecraft.class_1657): net.minecraft.class_268;
                  _getPlayerTeamColor(player: net.minecraft.class_1657): net.minecraft.class_124;
                  getPlayerTeamColorIndex(entity: world.entity.PlayerEntityHelper<net.minecraft.class_1657>): int;
                  getPlayerTeamColorIndex(): int;
                  _getPlayerTeamColorIndex(entity: net.minecraft.class_1657): int;
                  getTeamColor(player: world.entity.PlayerEntityHelper<net.minecraft.class_1657>): int;
                  getTeamColor(): int;
                  getTeamColorFormatting(): FormattingHelper;
                  getTeamColorFormatting(player: world.entity.PlayerEntityHelper<net.minecraft.class_1657>): FormattingHelper;
                  getTeamColorName(player: world.entity.PlayerEntityHelper<net.minecraft.class_1657>): string;
                  getTeamColorName(): string;
                  getTeams(): java.util.List<TeamHelper>;
                  toString(): string;
                }
                interface ScoreboardsHelper extends CombineTypes<[_ScoreboardsHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_269>]> {}
                interface _ServerInfoHelper$$static extends ClassLike {
                  new(base: net.minecraft.class_642): ServerInfoHelper;
                }
                let ServerInfoHelper: _ServerInfoHelper$$static;
                interface _ServerInfoHelper {
                  getAddress(): string;
                  getIcon(): byte[];
                  getLabel(): TextHelper;
                  getName(): string;
                  getNbt(): NBTElementHelper$NBTCompoundHelper;
                  getPing(): long;
                  getPlayerCountLabel(): TextHelper;
                  getPlayerListSummary(): java.util.List<TextHelper>;
                  getProtocolVersion(): int;
                  getVersion(): TextHelper;
                  isLocal(): boolean;
                  isOnline(): boolean;
                  resourcePackPolicy(): string;
                  toString(): string;
                }
                interface ServerInfoHelper extends CombineTypes<[_ServerInfoHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_642>]> {}
                interface _StateHelper$$static<U> extends ClassLike {
                  new(base: U): StateHelper<U>;
                }
                let StateHelper: _StateHelper$$static<U>;
                interface _StateHelper<U> {
                  _create(a0: U): StateHelper<U>;
(a0: U): StateHelper<U>;
                  toMap(): java.util.Map<string,string>;
                  with<T>(property: string, value: string): StateHelper<U>;
                  _with<T>(property: net.minecraft.class_2769<T>, value: string): StateHelper<U>;
                }
                interface StateHelper<U> extends CombineTypes<[_StateHelper<U>, jsmacros.core.helpers.BaseHelper<U>]> {}
                interface _TeamHelper$$static extends ClassLike {
                  new(t: net.minecraft.class_268): TeamHelper;
                }
                let TeamHelper: _TeamHelper$$static;
                interface _TeamHelper {
                  deathMessageVisibility(): string;
                  getCollisionRule(): string;
                  getColor(): int;
                  getColorFormat(): FormattingHelper;
                  getColorIndex(): int;
                  getColorName(): string;
                  getColorValue(): int;
                  getDisplayName(): TextHelper;
                  getName(): string;
                  getPlayerList(): java.util.List<string>;
                  getPrefix(): TextHelper;
                  getScoreboard(): ScoreboardsHelper;
                  getSuffix(): TextHelper;
                  isFriendlyFire(): boolean;
                  nametagVisibility(): string;
                  showFriendlyInvisibles(): boolean;
                  toString(): string;
                }
                interface TeamHelper extends CombineTypes<[_TeamHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_268>]> {}
                interface _UniversalBlockStateHelper$$static extends ClassLike {
                  _SCREAMING_SNAKE_CASE_TO_PascalCase(input: string): string;
                  main(args: string[]): void;
                  new(base: net.minecraft.class_2680): UniversalBlockStateHelper;
                }
                let UniversalBlockStateHelper: _UniversalBlockStateHelper$$static;
                interface _UniversalBlockStateHelper {
                  canSummon(): boolean;
                  getAge(): int;
                  getAttachment(): string;
                  getAxis(): string;
                  getBambooLeaves(): string;
                  getBedPart(): string;
                  getBites(): int;
                  getBlockFace(): string;
                  getBlockHalf(): string;
                  getCandles(): int;
                  getCharges(): int;
                  getChestType(): string;
                  getComparatorMode(): string;
                  getDelay(): int;
                  getDistance(): int;
                  getDoorHinge(): string;
                  getDoubleBlockHalf(): string;
                  getDusted(): int;
                  getEastWallShape(): string;
                  getEastWireConnection(): string;
                  getEggs(): int;
                  getFacing(): DirectionHelper;
                  getFlowerAmount(): int;
                  getHatched(): int;
                  getHoneyLevel(): int;
                  getHopperFacing(): DirectionHelper;
                  getHorizontalAxis(): string;
                  getHorizontalFacing(): DirectionHelper;
                  getInstrument(): string;
                  getLayers(): int;
                  getLevel(): int;
                  getMaxAge(): int;
                  getMaxDistance(): int;
                  getMaxLevel(): int;
                  getMinDistance(): int;
                  getMinLevel(): int;
                  getMoisture(): int;
                  getNorthWallShape(): string;
                  getNorthWireConnection(): string;
                  getNote(): int;
                  getOrientation(): string;
                  getPickles(): int;
                  getPistonType(): string;
                  getPower(): int;
                  getRailShape(): string;
                  getRotation(): int;
                  getSculkSensorPhase(): string;
                  getSlabType(): string;
                  getSouthWallShape(): string;
                  getSouthWireConnection(): string;
                  getStage(): int;
                  getStairShape(): string;
                  getStraightRailShape(): string;
                  getStructureBlockMode(): string;
                  getThickness(): string;
                  getTilt(): string;
                  getTrialSpawnerState(): string;
                  getVaultState(): string;
                  getVerticalDirection(): string;
                  getWestWallShape(): string;
                  getWestWireConnection(): string;
                  hasBerries(): boolean;
                  hasBook(): boolean;
                  hasBottle0(): boolean;
                  hasBottle1(): boolean;
                  hasBottle2(): boolean;
                  hasEye(): boolean;
                  hasRecord(): boolean;
                  isAttached(): boolean;
                  isBloom(): boolean;
                  isBottom(): boolean;
                  isBubbleColumnDown(): boolean;
                  isBubbleColumnUp(): boolean;
                  isConditional(): boolean;
                  isCracked(): boolean;
                  isCrafting(): boolean;
                  isDisarmed(): boolean;
                  isDown(): boolean;
                  isEast(): boolean;
                  isEnabled(): boolean;
                  isExtended(): boolean;
                  isFalling(): boolean;
                  isHanging(): boolean;
                  isInWall(): boolean;
                  isInverted(): boolean;
                  isLit(): boolean;
                  isLocked(): boolean;
                  isNorth(): boolean;
                  isOccupied(): boolean;
                  isOminous(): boolean;
                  isOpen(): boolean;
                  isPersistent(): boolean;
                  isPowered(): boolean;
                  isShort(): boolean;
                  isShrieking(): boolean;
                  isSignalFire(): boolean;
                  isSlot0Occupied(): boolean;
                  isSlot1Occupied(): boolean;
                  isSlot2Occupied(): boolean;
                  isSlot3Occupied(): boolean;
                  isSlot4Occupied(): boolean;
                  isSlot5Occupied(): boolean;
                  isSnowy(): boolean;
                  isSouth(): boolean;
                  isTriggered(): boolean;
                  isUnstable(): boolean;
                  isUp(): boolean;
                  isWaterlogged(): boolean;
                  isWest(): boolean;
                  _ages: net.minecraft.class_2758[];
                  _distance: net.minecraft.class_2758[];
                  _levels: net.minecraft.class_2758[];
                }
                interface UniversalBlockStateHelper extends CombineTypes<[_UniversalBlockStateHelper, xyz.wagyourtail.jsmacros.client.api.helper.world.BlockStateHelper]> {}
                interface _UniversalBlockStateHelper$Ignore$$static extends ClassLike {
                }
                let UniversalBlockStateHelper$Ignore: _UniversalBlockStateHelper$Ignore$$static;
                interface _UniversalBlockStateHelper$Ignore {
                  value(): string[];
(): string[];
                }
                interface UniversalBlockStateHelper$Ignore extends CombineTypes<[_UniversalBlockStateHelper$Ignore, java.lang.annotation.Annotation, java.lang.Object]> {}
              }
              interface _AdvancementHelper$$static extends ClassLike {
                _mc: net.minecraft.class_310;
                new(base: net.minecraft.class_8781): AdvancementHelper;
              }
              let AdvancementHelper: _AdvancementHelper$$static;
              interface _AdvancementHelper {
                getChildren(): java.util.List<AdvancementHelper>;
                getExperience(): int;
                getId(): string;
                getLoot(): string[];
                getParent(): AdvancementHelper;
                getProgress(): AdvancementProgressHelper;
                getRecipes(): string[];
                getRequirementCount(): int;
                getRequirements(): java.util.List<java.util.List<string>>;
                toJson(): string;
                toString(): string;
              }
              interface AdvancementHelper extends CombineTypes<[_AdvancementHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_8781>]> {}
              interface _AdvancementManagerHelper$$static extends ClassLike {
                new(advancementManager: net.minecraft.class_163): AdvancementManagerHelper;
              }
              let AdvancementManagerHelper: _AdvancementManagerHelper$$static;
              interface _AdvancementManagerHelper {
                getAdvancement(identifier: string): AdvancementHelper;
                getAdvancementProgress(identifier: string): AdvancementProgressHelper;
                getAdvancements(): java.util.List<AdvancementHelper>;
                getAdvancementsForIdentifiers(): java.util.Map<string,AdvancementHelper>;
                getAdvancementsProgress(): java.util.Map<AdvancementHelper,AdvancementProgressHelper>;
                getCompletedAdvancements(): java.util.List<AdvancementHelper>;
                getMissingAdvancements(): java.util.List<AdvancementHelper>;
                _getProgressStream(): java.util.stream.Stream<java.util.Map$Entry<net.minecraft.class_8779,net.minecraft.class_167>>;
                getRootAdvancements(): java.util.List<AdvancementHelper>;
                getStartedAdvancements(): java.util.List<AdvancementHelper>;
                getSubAdvancements(): java.util.List<AdvancementHelper>;
                toString(): string;
              }
              interface AdvancementManagerHelper extends CombineTypes<[_AdvancementManagerHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_163>]> {}
              interface _AdvancementProgressHelper$$static extends ClassLike {
                new(base: net.minecraft.class_167): AdvancementProgressHelper;
              }
              let AdvancementProgressHelper: _AdvancementProgressHelper$$static;
              interface _AdvancementProgressHelper {
                countObtainedRequirements(): int;
                getCriteria(): java.util.Map<string,long>;
                getCriterionProgress(criteria: string): long;
                getEarliestProgressObtainDate(): long;
                getFraction(): TextHelper;
                getObtainedCriteria(): string[];
                getPercentage(): float;
                getRequirements(): java.util.List<java.util.List<string>>;
                getUnobtainedCriteria(): string[];
                isAnyObtained(): boolean;
                isCriteriaObtained(criteria: string): boolean;
                isDone(): boolean;
                toString(): string;
              }
              interface AdvancementProgressHelper extends CombineTypes<[_AdvancementProgressHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_167>]> {}
              interface _BlockPredicateHelper$$static extends ClassLike {
                _mc: net.minecraft.class_310;
                new(base: net.minecraft.class_4550): BlockPredicateHelper;
              }
              let BlockPredicateHelper: _BlockPredicateHelper$$static;
              interface _BlockPredicateHelper {
                getBlocks(): java.util.List<helper.world.BlockHelper>;
                getNbtPredicate(): NbtPredicateHelper;
                getStatePredicate(): StatePredicateHelper;
                test(state: helper.world.BlockPosHelper): boolean;
              }
              interface BlockPredicateHelper extends CombineTypes<[_BlockPredicateHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_4550>]> {}
              interface _CommandContextHelper$$static extends ClassLike {
                new(base: com.mojang.brigadier.context.CommandContext<any>): CommandContextHelper;
              }
              let CommandContextHelper: _CommandContextHelper$$static;
              interface _CommandContextHelper {
                equals(obj: any): boolean;
                getArg(name: string): any;
                getChild(): CommandContextHelper;
                getInput(): string;
                getRange(): com.mojang.brigadier.context.StringRange;
                getRaw(): com.mojang.brigadier.context.CommandContext<any>;
                hashCode(): int;
                _base: com.mojang.brigadier.context.CommandContext<any>;
              }
              interface CommandContextHelper extends CombineTypes<[_CommandContextHelper, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
              interface _CommandNodeHelper$$static extends ClassLike {
                new(base: com.mojang.brigadier.tree.CommandNode<any>): CommandNodeHelper;
                new(base: com.mojang.brigadier.tree.CommandNode<any>, fabric: com.mojang.brigadier.tree.CommandNode<any>): CommandNodeHelper;
              }
              let CommandNodeHelper: _CommandNodeHelper$$static;
              interface _CommandNodeHelper {
                readonly fabric: com.mojang.brigadier.tree.CommandNode<any>;
              }
              interface CommandNodeHelper extends CombineTypes<[_CommandNodeHelper, jsmacros.core.helpers.BaseHelper<com.mojang.brigadier.tree.CommandNode>]> {}
              interface _DyeColorHelper$$static extends ClassLike {
                new(base: net.minecraft.class_1767): DyeColorHelper;
              }
              let DyeColorHelper: _DyeColorHelper$$static;
              interface _DyeColorHelper {
                getColorValue(): int;
                getFireworkColor(): int;
                getId(): int;
                getName(): string;
                getSignColor(): int;
              }
              interface DyeColorHelper extends CombineTypes<[_DyeColorHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1767>]> {}
              interface _FormattingHelper$$static extends ClassLike {
                new(base: net.minecraft.class_124): FormattingHelper;
              }
              let FormattingHelper: _FormattingHelper$$static;
              interface _FormattingHelper {
                getCode(): char;
                getColorIndex(): int;
                getColorValue(): int;
                getName(): string;
                isColor(): boolean;
                isModifier(): boolean;
                toString(): string;
              }
              interface FormattingHelper extends CombineTypes<[_FormattingHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_124>]> {}
              interface _InteractionManagerHelper$$static extends ClassLike {
                new(base: net.minecraft.class_636): InteractionManagerHelper;
              }
              let InteractionManagerHelper: _InteractionManagerHelper$$static;
              interface _InteractionManagerHelper {
                attack(): InteractionManagerHelper;
                attack(await: boolean): InteractionManagerHelper;
                attack(entity: helper.world.entity.EntityHelper<any>): InteractionManagerHelper;
                attack(entity: helper.world.entity.EntityHelper<any>, await: boolean): InteractionManagerHelper;
                attack(x: int, y: int, z: int, direction: string): InteractionManagerHelper;
                attack(x: int, y: int, z: int, direction: int): InteractionManagerHelper;
                attack(x: int, y: int, z: int, direction: string, await: boolean): InteractionManagerHelper;
                attack(x: int, y: int, z: int, direction: int, await: boolean): InteractionManagerHelper;
                _attack(x: int, y: int, z: int, direction: net.minecraft.class_2350, await: boolean): InteractionManagerHelper;
                breakBlock(): api.classes.InteractionProxy$Break$BreakBlockResult;
                breakBlock(x: int, y: int, z: int): api.classes.InteractionProxy$Break$BreakBlockResult;
                breakBlock(pos: helper.world.BlockPosHelper): api.classes.InteractionProxy$Break$BreakBlockResult;
                _breakBlock(pos: net.minecraft.class_2338): api.classes.InteractionProxy$Break$BreakBlockResult;
                breakBlockAsync(callback: jsmacros.core.MethodWrapper<api.classes.InteractionProxy$Break$BreakBlockResult,any,any,any>): InteractionManagerHelper;
                cancelBreakBlock(): InteractionManagerHelper;
                checkBase(update: boolean): boolean;
                _checkInstaBreak(): api.classes.InteractionProxy$Break$BreakBlockResult;
                _checkInstaBreak(pos: net.minecraft.class_2338): api.classes.InteractionProxy$Break$BreakBlockResult;
                clearTargetOverride(): InteractionManagerHelper;
                getGameMode(): string;
                getTarget(): helper.world.HitResultHelper<any>;
                getTargetedBlock(): helper.world.BlockPosHelper;
                getTargetedEntity(): helper.world.entity.EntityHelper<any>;
                hasBreakBlockOverride(): boolean;
                hasInteractOverride(): boolean;
                hasTargetOverride(): boolean;
                holdInteract(holding: boolean): InteractionManagerHelper;
                holdInteract(holding: boolean, awaitFirstClick: boolean): InteractionManagerHelper;
                holdInteract(ticks: int): int;
                holdInteract(ticks: int, stopOnPause: boolean): int;
                interact(): InteractionManagerHelper;
                interact(await: boolean): InteractionManagerHelper;
                interactBlock(x: int, y: int, z: int, direction: string, offHand: boolean): InteractionManagerHelper;
                interactBlock(x: int, y: int, z: int, direction: int, offHand: boolean): InteractionManagerHelper;
                interactBlock(x: int, y: int, z: int, direction: string, offHand: boolean, await: boolean): InteractionManagerHelper;
                interactBlock(x: int, y: int, z: int, direction: int, offHand: boolean, await: boolean): InteractionManagerHelper;
                _interactBlock(x: int, y: int, z: int, direction: net.minecraft.class_2350, offHand: boolean, await: boolean): InteractionManagerHelper;
                interactEntity(entity: helper.world.entity.EntityHelper<any>, offHand: boolean): InteractionManagerHelper;
                interactEntity(entity: helper.world.entity.EntityHelper<any>, offHand: boolean, await: boolean): InteractionManagerHelper;
                interactItem(offHand: boolean): InteractionManagerHelper;
                interactItem(offHand: boolean, await: boolean): InteractionManagerHelper;
                isBreakingBlock(): boolean;
                _preBreakBlock(): void;
                resetTargetChecks(): InteractionManagerHelper;
                setGameMode(gameMode: string): InteractionManagerHelper;
                setTarget(x: int, y: int, z: int): InteractionManagerHelper;
                setTarget(x: int, y: int, z: int, direction: string): InteractionManagerHelper;
                setTarget(x: int, y: int, z: int, direction: int): InteractionManagerHelper;
                setTarget(pos: helper.world.BlockPosHelper): InteractionManagerHelper;
                setTarget(pos: helper.world.BlockPosHelper, direction: string): InteractionManagerHelper;
                setTarget(pos: helper.world.BlockPosHelper, direction: int): InteractionManagerHelper;
                setTarget(entity: helper.world.entity.EntityHelper<any>): InteractionManagerHelper;
                setTargetAirCheck(enabled: boolean, autoClear: boolean): InteractionManagerHelper;
                setTargetMissed(): InteractionManagerHelper;
                setTargetRangeCheck(enabled: boolean, autoClear: boolean): InteractionManagerHelper;
                setTargetShapeCheck(enabled: boolean, autoClear: boolean): InteractionManagerHelper;
                autoUpdateBase: boolean;
                _mc: net.minecraft.class_310;
              }
              interface InteractionManagerHelper extends CombineTypes<[_InteractionManagerHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_636>]> {}
              interface _NBTElementHelper$$static<T> extends ClassLike {
                resolve(element: net.minecraft.class_2520): NBTElementHelper<any>;
                wrap(element: net.minecraft.class_2520): NBTElementHelper<any>;
                wrapCompound(compound: net.minecraft.class_2487): NBTElementHelper$NBTCompoundHelper;
                _nbtPaths: java.util.LinkedHashMap<string,net.minecraft.class_2203$class_2209>;
              }
              let NBTElementHelper: _NBTElementHelper$$static<T>;
              interface _NBTElementHelper<T> {
                asCompoundHelper(): NBTElementHelper$NBTCompoundHelper;
                asListHelper(): NBTElementHelper$NBTListHelper;
                asNumberHelper(): NBTElementHelper$NBTNumberHelper;
                asString(): string;
                asText(): TextHelper;
                getType(): int;
                isCompound(): boolean;
                isList(): boolean;
                isNull(): boolean;
                isNumber(): boolean;
                isString(): boolean;
                resolve(nbtPath: string): java.util.List<NBTElementHelper<any>>;
                toString(): string;
              }
              interface NBTElementHelper<T> extends CombineTypes<[_NBTElementHelper<T>, jsmacros.core.helpers.BaseHelper<T>]> {}
              interface _NBTElementHelper$NBTCompoundHelper$$static extends ClassLike {
                new(base: net.minecraft.class_2487): NBTElementHelper$NBTCompoundHelper;
              }
              let NBTElementHelper$NBTCompoundHelper: _NBTElementHelper$NBTCompoundHelper$$static;
              interface _NBTElementHelper$NBTCompoundHelper {
                asString(key: string): string;
                get(key: string): NBTElementHelper<any>;
                getKeys(): java.util.Set<string>;
                getType(key: string): int;
                has(key: string): boolean;
              }
              interface NBTElementHelper$NBTCompoundHelper extends CombineTypes<[_NBTElementHelper$NBTCompoundHelper, NBTElementHelper<net.minecraft.class_2487>]> {}
              interface _NBTElementHelper$NBTListHelper$$static extends ClassLike {
                new(base: net.minecraft.class_2483): NBTElementHelper$NBTListHelper;
              }
              let NBTElementHelper$NBTListHelper: _NBTElementHelper$NBTListHelper$$static;
              interface _NBTElementHelper$NBTListHelper {
                asUUID(): java.util.UUID;
                get(index: int): NBTElementHelper<any>;
                getHeldType(): int;
                isPossiblyUUID(): boolean;
                length(): int;
              }
              interface NBTElementHelper$NBTListHelper extends CombineTypes<[_NBTElementHelper$NBTListHelper, NBTElementHelper<net.minecraft.class_2483>]> {}
              interface _NBTElementHelper$NBTNumberHelper$$static extends ClassLike {
                new(base: net.minecraft.class_2514): NBTElementHelper$NBTNumberHelper;
              }
              let NBTElementHelper$NBTNumberHelper: _NBTElementHelper$NBTNumberHelper$$static;
              interface _NBTElementHelper$NBTNumberHelper {
                asByte(): byte;
                asDouble(): double;
                asFloat(): float;
                asInt(): int;
                asLong(): long;
                asNumber(): number;
                asShort(): short;
              }
              interface NBTElementHelper$NBTNumberHelper extends CombineTypes<[_NBTElementHelper$NBTNumberHelper, NBTElementHelper<net.minecraft.class_2514>]> {}
              interface _NbtPredicateHelper$$static extends ClassLike {
                new(base: net.minecraft.class_2105): NbtPredicateHelper;
              }
              let NbtPredicateHelper: _NbtPredicateHelper$$static;
              interface _NbtPredicateHelper {
                test(entity: helper.world.entity.EntityHelper<any>): boolean;
                test(itemStack: helper.inventory.ItemStackHelper): boolean;
                test(nbtElement: NBTElementHelper<any>): boolean;
              }
              interface NbtPredicateHelper extends CombineTypes<[_NbtPredicateHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2105>]> {}
              interface _OptionsHelper$$static extends ClassLike {
                _SOUND_CATEGORY_MAP: java.util.Map<string,net.minecraft.class_3419>;
                new(options: net.minecraft.class_315): OptionsHelper;
              }
              let OptionsHelper: _OptionsHelper$$static;
              interface _OptionsHelper {
                getAccessibilityOptions(): OptionsHelper$AccessibilityOptionsHelper;
                _getBase(option: net.minecraft.class_7172<any>): client.mixin.access.MixinSimpleOption;
                getCameraMode(): int;
                getChatOptions(): OptionsHelper$ChatOptionsHelper;
                getCloudMode(): int;
                getControlOptions(): OptionsHelper$ControlOptionsHelper;
                getDifficulty(): string;
                getEnabledResourcePacks(): java.util.List<string>;
                getFov(): int;
                getGamma(): double;
                getGraphicsMode(): int;
                getGuiScale(): int;
                getHeight(): int;
                getLanguage(): string;
                getMusicOptions(): OptionsHelper$MusicOptionsHelper;
                getRenderDistance(): int;
                getResourcePacks(): java.util.List<string>;
                getSkinOptions(): OptionsHelper$SkinOptionsHelper;
                getSmoothCamera(): boolean;
                getVideoOptions(): OptionsHelper$VideoOptionsHelper;
                getVolume(category: string): float;
                getVolumes(): java.util.Map<string,float>;
                getWidth(): int;
                isDifficultyLocked(): boolean;
                isRightHanded(): boolean;
                lockDifficulty(): OptionsHelper;
                removeServerResourcePack(state: boolean): OptionsHelper;
                saveOptions(): OptionsHelper;
                sendSyncedOptions(): void;
                setCameraMode(mode: int): OptionsHelper;
                setCloudMode(mode: int): OptionsHelper;
                setDifficulty(name: string): OptionsHelper;
                setEnabledResourcePacks(enabled: string[]): OptionsHelper;
                setFov(fov: int): OptionsHelper;
                setGamma(gamma: double): OptionsHelper;
                setGraphicsMode(mode: int): OptionsHelper;
                setGuiScale(scale: int): OptionsHelper;
                setHeight(h: int): OptionsHelper;
                setLanguage(languageCode: string): OptionsHelper;
                setRenderDistance(d: int): OptionsHelper;
                setRightHanded(val: boolean): OptionsHelper;
                setSize(w: int, h: int): OptionsHelper;
                setSmoothCamera(val: boolean): OptionsHelper;
                setVolume(vol: double): OptionsHelper;
                setVolume(category: string, volume: double): OptionsHelper;
                setWidth(w: int): OptionsHelper;
                unlockDifficulty(): OptionsHelper;
                readonly accessibility: OptionsHelper$AccessibilityOptionsHelper;
                readonly chat: OptionsHelper$ChatOptionsHelper;
                readonly control: OptionsHelper$ControlOptionsHelper;
                _mc: net.minecraft.class_310;
                readonly music: OptionsHelper$MusicOptionsHelper;
                _rpm: net.minecraft.class_3283;
                readonly skin: OptionsHelper$SkinOptionsHelper;
                readonly video: OptionsHelper$VideoOptionsHelper;
              }
              interface OptionsHelper extends CombineTypes<[_OptionsHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_315>]> {}
              interface _OptionsHelper$AccessibilityOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$AccessibilityOptionsHelper;
              }
              let OptionsHelper$AccessibilityOptionsHelper: _OptionsHelper$AccessibilityOptionsHelper$$static;
              interface _OptionsHelper$AccessibilityOptionsHelper {
                areLightningFlashesHidden(): boolean;
                areSubtitlesShown(): boolean;
                enableAutoJump(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                enableBackgroundForChatOnly(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                enableMonochromeLogo(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                getChatDelay(): double;
                getChatLineSpacing(): double;
                getChatOpacity(): double;
                getDistortionEffect(): double;
                getFovEffect(): double;
                getNarratorMode(): string;
                getParent(): OptionsHelper;
                getTextBackgroundOpacity(): double;
                isAutoJumpEnabled(): boolean;
                isBackgroundForChatOnly(): boolean;
                isMonochromeLogoEnabled(): boolean;
                isSneakTogglingEnabled(): boolean;
                isSprintTogglingEnabled(): boolean;
                setChatDelay(val: double): OptionsHelper$AccessibilityOptionsHelper;
                setChatLineSpacing(val: double): OptionsHelper$AccessibilityOptionsHelper;
                setChatOpacity(val: double): OptionsHelper$AccessibilityOptionsHelper;
                setDistortionEffect(val: double): OptionsHelper$AccessibilityOptionsHelper;
                setFovEffect(val: double): OptionsHelper$AccessibilityOptionsHelper;
                setFovEffect(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                setNarratorMode(mode: string): OptionsHelper$AccessibilityOptionsHelper;
                setTextBackgroundOpacity(val: double): OptionsHelper$AccessibilityOptionsHelper;
                showSubtitles(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                toggleSneak(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                toggleSprint(val: boolean): OptionsHelper$AccessibilityOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$AccessibilityOptionsHelper extends CombineTypes<[_OptionsHelper$AccessibilityOptionsHelper, java.lang.Object]> {}
              interface _OptionsHelper$ChatOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$ChatOptionsHelper;
              }
              let OptionsHelper$ChatOptionsHelper: _OptionsHelper$ChatOptionsHelper$$static;
              interface _OptionsHelper$ChatOptionsHelper {
                areColorsShown(): boolean;
                areCommandSuggestionsEnabled(): boolean;
                areMatchedNamesHidden(): boolean;
                areWebLinksEnabled(): boolean;
                enableCommandSuggestions(val: boolean): OptionsHelper$ChatOptionsHelper;
                enableHideMatchedNames(val: boolean): OptionsHelper$ChatOptionsHelper;
                enableWebLinkPrompt(val: boolean): OptionsHelper$ChatOptionsHelper;
                enableWebLinks(val: boolean): OptionsHelper$ChatOptionsHelper;
                getChatDelay(): double;
                getChatFocusedHeight(): double;
                getChatLineSpacing(): double;
                getChatOpacity(): double;
                getChatUnfocusedHeight(): double;
                getChatVisibility(): string;
                getChatWidth(): double;
                getNarratorMode(): string;
                getParent(): OptionsHelper;
                getTextBackgroundOpacity(): double;
                getTextSize(): double;
                isDebugInfoReduced(): boolean;
                isWebLinkPromptEnabled(): boolean;
                reduceDebugInfo(val: boolean): OptionsHelper$ChatOptionsHelper;
                setChatDelay(val: double): OptionsHelper$ChatOptionsHelper;
                setChatFocusedHeight(val: double): OptionsHelper$ChatOptionsHelper;
                setChatLineSpacing(val: double): OptionsHelper$ChatOptionsHelper;
                setChatOpacity(val: double): OptionsHelper$ChatOptionsHelper;
                setChatUnfocusedHeight(val: double): OptionsHelper$ChatOptionsHelper;
                setChatVisibility(mode: string): OptionsHelper$ChatOptionsHelper;
                setChatWidth(val: double): OptionsHelper$ChatOptionsHelper;
                setNarratorMode(mode: string): OptionsHelper$ChatOptionsHelper;
                setShowColors(val: boolean): OptionsHelper$ChatOptionsHelper;
                setTextBackgroundOpacity(val: double): OptionsHelper$ChatOptionsHelper;
                setTextSize(val: double): OptionsHelper$ChatOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$ChatOptionsHelper extends CombineTypes<[_OptionsHelper$ChatOptionsHelper, java.lang.Object]> {}
              interface _OptionsHelper$ControlOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$ControlOptionsHelper;
              }
              let OptionsHelper$ControlOptionsHelper: _OptionsHelper$ControlOptionsHelper$$static;
              interface _OptionsHelper$ControlOptionsHelper {
                enableAutoJump(val: boolean): OptionsHelper$ControlOptionsHelper;
                enableDiscreteScrolling(val: boolean): OptionsHelper$ControlOptionsHelper;
                enableRawMouseInput(val: boolean): OptionsHelper$ControlOptionsHelper;
                enableTouchscreen(val: boolean): OptionsHelper$ControlOptionsHelper;
                getCategories(): java.util.List<string>;
                getKeyBinds(): java.util.Map<string,string>;
                getKeyBindsByCategory(category: string): java.util.Map<string,string>;
                getKeyBindsByCategory(): java.util.Map<string,java.util.Map<string,string>>;
                getKeys(): java.util.List<string>;
                getMouseSensitivity(): double;
                getMouseWheelSensitivity(): double;
                getParent(): OptionsHelper;
                getRawKeys(): net.minecraft.class_304[];
                invertMouse(val: boolean): OptionsHelper$ControlOptionsHelper;
                isAutoJumpEnabled(): boolean;
                isDiscreteScrollingEnabled(): boolean;
                isMouseInverted(): boolean;
                isRawMouseInputEnabled(): boolean;
                isSneakTogglingEnabled(): boolean;
                isSprintTogglingEnabled(): boolean;
                isTouchscreenEnabled(): boolean;
                setMouseSensitivity(val: double): OptionsHelper$ControlOptionsHelper;
                setMouseWheelSensitivity(val: double): OptionsHelper$ControlOptionsHelper;
                toggleSneak(val: boolean): OptionsHelper$ControlOptionsHelper;
                toggleSprint(val: boolean): OptionsHelper$ControlOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$ControlOptionsHelper extends CombineTypes<[_OptionsHelper$ControlOptionsHelper, java.lang.Object]> {}
              interface _OptionsHelper$MusicOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$MusicOptionsHelper;
              }
              let OptionsHelper$MusicOptionsHelper: _OptionsHelper$MusicOptionsHelper$$static;
              interface _OptionsHelper$MusicOptionsHelper {
                areSubtitlesShown(): boolean;
                getAmbientVolume(): float;
                getAudioDevices(): java.util.List<string>;
                getBlocksVolume(): float;
                getHostileVolume(): float;
                getMasterVolume(): float;
                getMusicVolume(): float;
                getNeutralVolume(): float;
                getParent(): OptionsHelper;
                getPlayerVolume(): float;
                getRecordsVolume(): float;
                getSoundDevice(): string;
                getVoiceVolume(): float;
                getVolume(category: string): float;
                getVolumes(): java.util.Map<string,float>;
                getWeatherVolume(): float;
                setAmbientVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setBlocksVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setHostileVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setMasterVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setMusicVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setNeutralVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setPlayerVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setRecordsVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setSoundDevice(audioDevice: string): OptionsHelper$MusicOptionsHelper;
                setVoiceVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                setVolume(category: string, volume: double): OptionsHelper$MusicOptionsHelper;
                setWeatherVolume(volume: double): OptionsHelper$MusicOptionsHelper;
                showSubtitles(val: boolean): OptionsHelper$MusicOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$MusicOptionsHelper extends CombineTypes<[_OptionsHelper$MusicOptionsHelper, java.lang.Object]> {}
              interface _OptionsHelper$SkinOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$SkinOptionsHelper;
              }
              let OptionsHelper$SkinOptionsHelper: _OptionsHelper$SkinOptionsHelper$$static;
              interface _OptionsHelper$SkinOptionsHelper {
                getParent(): OptionsHelper;
                isCapeActivated(): boolean;
                isHatActivated(): boolean;
                isJacketActivated(): boolean;
                isLeftHanded(): boolean;
                isLeftPantsActivated(): boolean;
                isLeftSleeveActivated(): boolean;
                isRightHanded(): boolean;
                isRightPantsActivated(): boolean;
                isRightSleeveActivated(): boolean;
                toggleCape(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleHat(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleJacket(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleLeftPants(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleLeftSleeve(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleMainHand(hand: string): OptionsHelper$SkinOptionsHelper;
                toggleRightPants(val: boolean): OptionsHelper$SkinOptionsHelper;
                toggleRightSleeve(val: boolean): OptionsHelper$SkinOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$SkinOptionsHelper extends CombineTypes<[_OptionsHelper$SkinOptionsHelper, java.lang.Object]> {}
              interface _OptionsHelper$VideoOptionsHelper$$static extends ClassLike {
                new(this$0: OptionsHelper, OptionsHelper: OptionsHelper): OptionsHelper$VideoOptionsHelper;
              }
              let OptionsHelper$VideoOptionsHelper: _OptionsHelper$VideoOptionsHelper$$static;
              interface _OptionsHelper$VideoOptionsHelper {
                areEntityShadowsEnabled(): boolean;
                enableAutosaveIndicator(val: boolean): OptionsHelper$VideoOptionsHelper;
                enableEntityShadows(val: boolean): OptionsHelper$VideoOptionsHelper;
                enableViewBobbing(val: boolean): OptionsHelper$VideoOptionsHelper;
                enableVsync(val: boolean): OptionsHelper$VideoOptionsHelper;
                getAttackIndicatorType(): string;
                getBiomeBlendRadius(): int;
                getBrightness(): double;
                getChunkBuilderMode(): string;
                getCloudsMode(): string;
                getDistortionEffect(): double;
                getEntityDistance(): double;
                getFovEffects(): double;
                getFullscreenResolution(): string;
                getGamma(): double;
                getGraphicsMode(): string;
                getGuiScale(): int;
                getMaxFps(): int;
                getMipMapLevels(): int;
                getParent(): OptionsHelper;
                getParticleMode(): string;
                getRenderDistance(): int;
                getSimulationDistance(): int;
                getSmoothLightningMode(): boolean;
                isAutosaveIndicatorEnabled(): boolean;
                isFullscreen(): boolean;
                isViewBobbingEnabled(): boolean;
                isVsyncEnabled(): boolean;
                setAttackIndicatorType(type: string): OptionsHelper$VideoOptionsHelper;
                setBiomeBlendRadius(radius: int): OptionsHelper$VideoOptionsHelper;
                setBrightness(gamma: double): OptionsHelper$VideoOptionsHelper;
                setChunkBuilderMode(mode: string): OptionsHelper$VideoOptionsHelper;
                setCloudsMode(mode: string): OptionsHelper$VideoOptionsHelper;
                setDistortionEffects(val: double): OptionsHelper$VideoOptionsHelper;
                setEntityDistance(val: double): OptionsHelper$VideoOptionsHelper;
                setFovEffects(val: double): OptionsHelper$VideoOptionsHelper;
                setFullScreen(fullscreen: boolean): OptionsHelper$VideoOptionsHelper;
                setGamma(gamma: double): OptionsHelper$VideoOptionsHelper;
                setGraphicsMode(mode: string): OptionsHelper$VideoOptionsHelper;
                setGuiScale(scale: int): OptionsHelper$VideoOptionsHelper;
                setMaxFps(maxFps: int): OptionsHelper$VideoOptionsHelper;
                setMipMapLevels(val: int): OptionsHelper$VideoOptionsHelper;
                setParticleMode(mode: string): OptionsHelper$VideoOptionsHelper;
                setRenderDistance(radius: int): OptionsHelper$VideoOptionsHelper;
                setSimulationDistance(radius: int): OptionsHelper$VideoOptionsHelper;
                setSmoothLightningMode(mode: boolean): OptionsHelper$VideoOptionsHelper;
                readonly parent: OptionsHelper;
                _this$0: OptionsHelper;
              }
              interface OptionsHelper$VideoOptionsHelper extends CombineTypes<[_OptionsHelper$VideoOptionsHelper, java.lang.Object]> {}
              interface _PacketByteBufferHelper$$static extends ClassLike {
                _getBuffer(packet: net.minecraft.class_2596<any>): net.minecraft.class_2540;
                getPacketName(packet: net.minecraft.class_2596<any>): string;
                init(): void;
                main(args: string[]): void;
                readonly BUFFER_TO_PACKET: java.util.Map<java.lang.Class<net.minecraft.class_2596<any>>,java.util.function.Function<net.minecraft.class_2540,net.minecraft.class_2596<any>>>;
                _PACKETS: java.util.Map<string,java.lang.Class<net.minecraft.class_2596<any>>>;
                _PACKET_IDS: it.unimi.dsi.fastutil.objects.Object2IntMap<java.lang.Class<net.minecraft.class_2596<any>>>;
                _PACKET_NAMES: java.util.Map<java.lang.Class<net.minecraft.class_2596<any>>,string>;
                _PACKET_SIDES: it.unimi.dsi.fastutil.objects.Object2BooleanMap<java.lang.Class<net.minecraft.class_2596<any>>>;
                _PACKET_STATES: it.unimi.dsi.fastutil.objects.Object2IntMap<java.lang.Class<net.minecraft.class_2596<any>>>;
                _mc: net.minecraft.class_310;
                new(): PacketByteBufferHelper;
                new(base: net.minecraft.class_2540): PacketByteBufferHelper;
                new(packet: net.minecraft.class_2596<any>): PacketByteBufferHelper;
              }
              let PacketByteBufferHelper: _PacketByteBufferHelper$$static;
              interface _PacketByteBufferHelper {
                clear(): PacketByteBufferHelper;
                forEachInCollection(reader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,any,any>): PacketByteBufferHelper;
                getBoolean(index: int): boolean;
                getByte(index: int): byte;
                getBytes(index: int, length: int): byte[];
                getChar(index: int): char;
                getDouble(index: int): double;
                getFloat(index: int): float;
                getInt(index: int): int;
                getLong(index: int): long;
                getMedium(index: int): int;
                getNetworkStateId(packetClass: java.lang.Class<net.minecraft.class_2596<any>>): int;
                getPacketId(packetClass: java.lang.Class<net.minecraft.class_2596<any>>): int;
                getPacketNames(): java.util.List<string>;
                getShort(index: int): short;
                getUnsignedByte(index: int): short;
                getUnsignedInt(index: int): long;
                getUnsignedMedium(index: int): int;
                getUnsignedShort(index: int): int;
                isClientbound(packetClass: java.lang.Class<net.minecraft.class_2596<any>>): boolean;
                isServerbound(packetClass: java.lang.Class<net.minecraft.class_2596<any>>): boolean;
                markReaderIndex(): PacketByteBufferHelper;
                markWriterIndex(): PacketByteBufferHelper;
                readBitSet(): java.util.BitSet;
                readBlockHitResult(): net.minecraft.class_3965;
                readBlockHitResultHelper(): helper.world.HitResultHelper$Block;
                readBlockHitResultMap(): java.util.Map<string,any>;
                readBlockPos(): helper.world.BlockPosHelper;
                readBoolean(): boolean;
                readByte(): byte;
                readByteArray(): byte[];
                readByteArray(maxSize: int): byte[];
                readBytes(length: int): byte[];
                readChar(): char;
                readChunkHelper(): helper.world.ChunkHelper;
                readChunkPos(): int[];
                readChunkSectionPos(): helper.world.BlockPosHelper;
                readDate(): java.util.Date;
                readDouble(): double;
                readEnumConstant<T>(enumClass: java.lang.Class<T>): T;
                readFloat(): float;
                readIdentifier(): string;
                readInstant(): java.time.Instant;
                readInt(): int;
                readIntArray(): int[];
                readIntArray(maxSize: int): PacketByteBufferHelper;
                readIntList(): it.unimi.dsi.fastutil.ints.IntList;
                readList<T>(reader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,T,any>): java.util.List<T>;
                readLong(): long;
                readLongArray(): long[];
                readLongArray(maxSize: int): long[];
                readMap<K, V>(keyReader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,K,any>, valueReader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,V,any>): java.util.Map<K,V>;
                readMedium(): int;
                readNbt(): NBTElementHelper<any>;
                readNullable<T>(reader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,T,any>): T;
                readOptional<T>(reader: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,T,any>): java.util.Optional<T>;
                readPublicKey(): java.security.PublicKey;
                readRegistryKey<T>(registry: net.minecraft.class_5321<net.minecraft.class_2378<T>>): net.minecraft.class_5321<T>;
                readShort(): short;
                readString(): string;
                readString(maxLength: int): string;
                readUnsignedByte(): short;
                readUnsignedInt(): long;
                readUnsignedMedium(): int;
                readUnsignedShort(): int;
                readUuid(): java.util.UUID;
                readVarInt(): int;
                readVarLong(): long;
                readerIndex(): int;
                receivePacket(): PacketByteBufferHelper;
                receivePacket(packetName: string): PacketByteBufferHelper;
                receivePacket(clazz: java.lang.Class<net.minecraft.class_2596>): PacketByteBufferHelper;
                reset(): PacketByteBufferHelper;
                resetIndices(): PacketByteBufferHelper;
                resetReaderIndex(): PacketByteBufferHelper;
                resetWriterIndex(): PacketByteBufferHelper;
                sendPacket(): PacketByteBufferHelper;
                sendPacket(packetName: string): PacketByteBufferHelper;
                sendPacket(clazz: java.lang.Class<net.minecraft.class_2596<any>>): PacketByteBufferHelper;
                setBoolean(index: int, value: boolean): PacketByteBufferHelper;
                setByte(index: int, value: int): PacketByteBufferHelper;
                setBytes(index: int, bytes: byte[]): PacketByteBufferHelper;
                setChar(index: int, value: char): PacketByteBufferHelper;
                setDouble(index: int, value: double): PacketByteBufferHelper;
                setFloat(index: int, value: double): PacketByteBufferHelper;
                setIndices(readerIndex: int, writerIndex: int): PacketByteBufferHelper;
                setInt(index: int, value: int): PacketByteBufferHelper;
                setLong(index: int, value: long): PacketByteBufferHelper;
                setMedium(index: int, value: int): PacketByteBufferHelper;
                setReaderIndex(index: int): PacketByteBufferHelper;
                setShort(index: int, value: int): PacketByteBufferHelper;
                setWriterIndex(index: int): PacketByteBufferHelper;
                setZero(index: int, length: int): PacketByteBufferHelper;
                skipBytes(length: int): PacketByteBufferHelper;
                toPacket(): net.minecraft.class_2596<any>;
                toPacket(packetName: string): net.minecraft.class_2596<any>;
                toPacket(clazz: java.lang.Class<net.minecraft.class_2596>): net.minecraft.class_2596<any>;
                toString(): string;
                writeBitSet(bitSet: java.util.BitSet): PacketByteBufferHelper;
                writeBlockHitResult(hitResult: net.minecraft.class_3965): PacketByteBufferHelper;
                writeBlockHitResult(hitResult: helper.world.HitResultHelper$Block): PacketByteBufferHelper;
                writeBlockHitResult(pos: jsmacros.api.math.Pos3D, direction: string, blockPos: helper.world.BlockPosHelper, missed: boolean, insideBlock: boolean): PacketByteBufferHelper;
                writeBlockPos(pos: helper.world.BlockPosHelper): PacketByteBufferHelper;
                writeBlockPos(x: int, y: int, z: int): PacketByteBufferHelper;
                writeBoolean(value: boolean): PacketByteBufferHelper;
                writeByte(value: int): PacketByteBufferHelper;
                writeByteArray(bytes: byte[]): PacketByteBufferHelper;
                writeBytes(bytes: byte[]): PacketByteBufferHelper;
                writeChar(value: int): PacketByteBufferHelper;
                writeChunkPos(x: int, z: int): PacketByteBufferHelper;
                writeChunkPos(chunk: helper.world.ChunkHelper): PacketByteBufferHelper;
                writeChunkSectionPos(chunkX: int, y: int, chunkZ: int): PacketByteBufferHelper;
                writeChunkSectionPos(chunk: helper.world.ChunkHelper, y: int): PacketByteBufferHelper;
                writeCollection<T>(collection: java.util.Collection<T>, writer: jsmacros.core.MethodWrapper<net.minecraft.class_2540,T,any,any>): PacketByteBufferHelper;
                writeDate(date: java.util.Date): PacketByteBufferHelper;
                writeDouble(value: double): PacketByteBufferHelper;
                writeEnumConstant(constant: java.lang.Enum<any>): PacketByteBufferHelper;
                writeFloat(value: double): PacketByteBufferHelper;
                writeGlobalPos(dimension: string, pos: helper.world.BlockPosHelper): PacketByteBufferHelper;
                writeGlobalPos(dimension: string, x: int, y: int, z: int): PacketByteBufferHelper;
                writeIdentifier(id: string): PacketByteBufferHelper;
                writeInstant(instant: java.time.Instant): PacketByteBufferHelper;
                writeInt(value: int): PacketByteBufferHelper;
                writeIntArray(ints: int[]): PacketByteBufferHelper;
                writeIntList(list: java.util.Collection<int>): PacketByteBufferHelper;
                writeLong(value: long): PacketByteBufferHelper;
                writeLongArray(longs: long[]): PacketByteBufferHelper;
                writeMap<K, V>(map: java.util.Map<K,V>, keyWriter: jsmacros.core.MethodWrapper<net.minecraft.class_2540,K,any,any>, valueWriter: jsmacros.core.MethodWrapper<net.minecraft.class_2540,V,any,any>): PacketByteBufferHelper;
                writeMedium(value: int): PacketByteBufferHelper;
                writeNbt(nbt: NBTElementHelper$NBTCompoundHelper): PacketByteBufferHelper;
                writeNullable(value: any, writer: jsmacros.core.MethodWrapper<net.minecraft.class_2540,any,any,any>): PacketByteBufferHelper;
                writeOptional<T>(value: T, writer: jsmacros.core.MethodWrapper<net.minecraft.class_2540,T,any,any>): PacketByteBufferHelper;
                writePublicKey(key: java.security.PublicKey): PacketByteBufferHelper;
                writeRegistryKey(key: net.minecraft.class_5321<any>): PacketByteBufferHelper;
                writeShort(value: int): PacketByteBufferHelper;
                writeString(string: string): PacketByteBufferHelper;
                writeString(string: string, maxLength: int): PacketByteBufferHelper;
                writeUuid(uuid: string): PacketByteBufferHelper;
                writeVarInt(i: int): PacketByteBufferHelper;
                writeVarLong(l: long): PacketByteBufferHelper;
                writeZero(length: int): PacketByteBufferHelper;
                writerIndex(): int;
                _original: io.netty.buffer.ByteBuf;
                _packet: net.minecraft.class_2596<any>;
              }
              interface PacketByteBufferHelper extends CombineTypes<[_PacketByteBufferHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2540>]> {}
              interface _StatePredicateHelper$$static extends ClassLike {
                new(base: net.minecraft.class_4559): StatePredicateHelper;
              }
              let StatePredicateHelper: _StatePredicateHelper$$static;
              interface _StatePredicateHelper {
                test(state: helper.world.BlockStateHelper): boolean;
                test(state: helper.world.FluidStateHelper): boolean;
              }
              interface StatePredicateHelper extends CombineTypes<[_StatePredicateHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_4559>]> {}
              interface _StatsHelper$$static extends ClassLike {
                new(base: net.minecraft.class_3469): StatsHelper;
              }
              let StatsHelper: _StatsHelper$$static;
              interface _StatsHelper {
                getBlockMined(id: string): int;
                getCustomFormattedStat(id: string): string;
                getCustomStat(id: string): int;
                getEntityKilled(id: string): int;
                getFormattedStatMap(): java.util.Map<string,string>;
                getFormattedStatValue(statKey: string): string;
                getItemBroken(id: string): int;
                getItemCrafted(id: string): int;
                getItemDropped(id: string): int;
                getItemPickedUp(id: string): int;
                getItemUsed(id: string): int;
                getKilledByEntity(id: string): int;
                getRawStatMap(): java.util.Map<string,int>;
                getRawStatValue(statKey: string): int;
                _getStat<T>(type: net.minecraft.class_3448<T>, registry: net.minecraft.class_2378<T>, id: string): int;
                getStatList(): java.util.List<string>;
                getStatText(statKey: string): net.minecraft.class_2561;
                _getTranslationKey(stat: net.minecraft.class_3445<any>): string;
                toString(): string;
                updateStatistics(): StatsHelper;
              }
              interface StatsHelper extends CombineTypes<[_StatsHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_3469>]> {}
              interface _StatusEffectHelper$$static extends ClassLike {
                new(s: net.minecraft.class_1293): StatusEffectHelper;
                new(s: net.minecraft.class_1291): StatusEffectHelper;
                new(s: net.minecraft.class_1291, t: int): StatusEffectHelper;
              }
              let StatusEffectHelper: _StatusEffectHelper$$static;
              interface _StatusEffectHelper {
                getCategory(): string;
                getId(): string;
                getStrength(): int;
                getTime(): int;
                hasIcon(): boolean;
                isAmbient(): boolean;
                isBeneficial(): boolean;
                isHarmful(): boolean;
                isInstant(): boolean;
                isNeutral(): boolean;
                isPermanent(): boolean;
                isVisible(): boolean;
                toString(): string;
              }
              interface StatusEffectHelper extends CombineTypes<[_StatusEffectHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_1293>]> {}
              interface _StyleHelper$$static extends ClassLike {
                new(base: net.minecraft.class_2583): StyleHelper;
              }
              let StyleHelper: _StyleHelper$$static;
              interface _StyleHelper {
                bold(): boolean;
                getClickAction(): string;
                getClickValue(): string;
                getColor(): int;
                getColorIndex(): int;
                getColorName(): string;
                getColorValue(): int;
                getCustomClickValue(): java.lang.Runnable;
                getCustomColor(): int;
                getFormatting(): FormattingHelper;
                getHoverAction(): string;
                getHoverValue(): any;
                getInsertion(): string;
                hasColor(): boolean;
                hasCustomColor(): boolean;
                italic(): boolean;
                obfuscated(): boolean;
                strikethrough(): boolean;
                toString(): string;
                underlined(): boolean;
              }
              interface StyleHelper extends CombineTypes<[_StyleHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2583>]> {}
              interface _SuggestionsBuilderHelper$$static extends ClassLike {
                new(base: com.mojang.brigadier.suggestion.SuggestionsBuilder): SuggestionsBuilderHelper;
              }
              let SuggestionsBuilderHelper: _SuggestionsBuilderHelper$$static;
              interface _SuggestionsBuilderHelper {
                getInput(): string;
                getRemaining(): string;
                getRemainingLowerCase(): string;
                getStart(): int;
                suggest(suggestion: string): SuggestionsBuilderHelper;
                suggest(value: int): SuggestionsBuilderHelper;
                suggestBlockPositions(positions: helper.world.BlockPosHelper[]): SuggestionsBuilderHelper;
                suggestBlockPositions(...positions: helper.world.BlockPosHelper[]): SuggestionsBuilderHelper;
                suggestBlockPositions(positions: java.util.Collection<helper.world.BlockPosHelper>): SuggestionsBuilderHelper;
                suggestIdentifier(identifiers: string[]): SuggestionsBuilderHelper;
                suggestIdentifier(...identifiers: string[]): SuggestionsBuilderHelper;
                suggestIdentifier(identifiers: java.util.Collection<string>): SuggestionsBuilderHelper;
                suggestMatching(suggestions: string[]): SuggestionsBuilderHelper;
                suggestMatching(...suggestions: string[]): SuggestionsBuilderHelper;
                suggestMatching(suggestions: java.util.Collection<string>): SuggestionsBuilderHelper;
                suggestPositions(positions: string[]): SuggestionsBuilderHelper;
                suggestPositions(...positions: string[]): SuggestionsBuilderHelper;
                suggestPositions(positions: java.util.Collection<string>): SuggestionsBuilderHelper;
                suggestWithTooltip(suggestion: string, tooltip: TextHelper): SuggestionsBuilderHelper;
                suggestWithTooltip(value: int, tooltip: TextHelper): SuggestionsBuilderHelper;
              }
              interface SuggestionsBuilderHelper extends CombineTypes<[_SuggestionsBuilderHelper, jsmacros.core.helpers.BaseHelper<com.mojang.brigadier.suggestion.SuggestionsBuilder>]> {}
              interface _TextHelper$$static extends ClassLike {
                wrap(t: net.minecraft.class_2561): TextHelper;
                readonly STRIP_FORMATTING_PATTERN: java.util.regex.Pattern;
                _mc: net.minecraft.class_310;
              }
              let TextHelper: _TextHelper$$static;
              interface _TextHelper {
                getJson(): string;
                getString(): string;
                getStringStripFormatting(): string;
                getWidth(): int;
                replaceFromJson(json: string): string;
                replaceFromString(content: string): TextHelper;
                toJson(): string;
                toString(): string;
                visit(visitor: jsmacros.core.MethodWrapper<StyleHelper,string,any,any>): TextHelper;
                withoutFormatting(): TextHelper;
              }
              interface TextHelper extends CombineTypes<[_TextHelper, jsmacros.core.helpers.BaseHelper<net.minecraft.class_2561>]> {}
            }
            module library {
              module impl {
                interface _FChat$$static extends ClassLike {
                  _logInternal(message: string): void;
                  _logInternal(text: api.helper.TextHelper): void;
                  _AMPERSAND_PATTERN: java.util.regex.Pattern;
                  _SECTION_SYMBOL_PATTERN: java.util.regex.Pattern;
                  _mc: net.minecraft.class_310;
                  new(runner: jsmacros.core.Core<any,any>): FChat;
                }
                let FChat: _FChat$$static;
                interface _FChat {
                  actionbar(text: any): void;
                  actionbar(text: any, tinted: boolean): void;
                  ampersandToSectionSymbol(string: string): string;
                  createCommandBuilder(name: string): api.classes.inventory.CommandBuilder;
                  createTextBuilder(): api.classes.TextBuilder;
                  createTextHelperFromJSON(json: string): api.helper.TextHelper;
                  createTextHelperFromString(content: string): api.helper.TextHelper;
                  createTextHelperFromTranslationKey(key: string, content: any[]): api.helper.TextHelper;
                  createTextHelperFromTranslationKey(key: string, ...content: any[]): api.helper.TextHelper;
                  getCommandManager(): api.classes.inventory.CommandManager;
                  getHistory(): api.classes.inventory.ChatHistoryManager;
                  getLogger(): org.slf4j.Logger;
                  getLogger(name: string): org.slf4j.Logger;
                  getTextWidth(text: string): int;
                  log(message: any): void;
                  log(message: any, await: boolean): void;
                  logColor(message: string): void;
                  logColor(message: string, await: boolean): void;
                  logf(message: string, args: any[]): void;
                  logf(message: string, ...args: any[]): void;
                  logf(message: string, await: boolean, args: any[]): void;
                  logf(message: string, await: boolean, ...args: any[]): void;
                  open(message: string): void;
                  open(message: string, await: boolean): void;
                  reRegisterCommand(node: api.helper.CommandNodeHelper): void;
                  say(message: string): void;
                  say(message: string, await: boolean): void;
                  _sayInternal(message: string): void;
                  sayf(message: string, args: any[]): void;
                  sayf(message: string, ...args: any[]): void;
                  sayf(message: string, await: boolean, args: any[]): void;
                  sayf(message: string, await: boolean, ...args: any[]): void;
                  sectionSymbolToAmpersand(string: string): string;
                  stripFormatting(string: string): string;
                  title(title: any, subtitle: any, fadeIn: int, remain: int, fadeOut: int): void;
                  toast(title: any, desc: any): void;
                  unregisterCommand(name: string): api.helper.CommandNodeHelper;
                }
                interface FChat extends CombineTypes<[_FChat, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
                interface _FClient$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  tickSynchronizer: client.tick.TickSync;
                  new(context: jsmacros.core.language.BaseScriptContext<any>): FClient;
                }
                let FClient: _FClient$$static;
                interface _FClient {
                  cancelAllPings(): void;
                  connect(ip: string): void;
                  connect(ip: string, port: int): void;
                  createPacketByteBuffer(): api.helper.PacketByteBufferHelper;
                  disconnect(): void;
                  disconnect(callback: jsmacros.core.MethodWrapper<boolean,any,any,any>): void;
                  exitGameForcefully(): void;
                  exitGamePeacefully(): void;
                  getClipboard(): string;
                  getFPS(): string;
                  getGameOptions(): api.helper.OptionsHelper;
                  getLoadedMods(): java.util.List<jsmacros.api.helper.ModContainerHelper<any>>;
                  getMinecraft(): net.minecraft.class_310;
                  getMod(modId: string): jsmacros.api.helper.ModContainerHelper<any>;
                  getModLoader(): string;
                  getRegisteredBlocks(): java.util.List<api.helper.world.BlockHelper>;
                  getRegisteredItems(): java.util.List<api.helper.inventory.ItemHelper>;
                  getRegistryManager(): api.classes.RegistryHelper;
                  grabMouse(): void;
                  isDevEnv(): boolean;
                  isModLoaded(modId: string): boolean;
                  loadWorld(folderName: string): void;
                  mcVersion(): string;
                  ping(ip: string): api.helper.world.ServerInfoHelper;
                  pingAsync(ip: string, callback: jsmacros.core.MethodWrapper<api.helper.world.ServerInfoHelper,java.io.IOException,any,any>): void;
                  receivePacket(packet: net.minecraft.class_2596<net.minecraft.class_2602>): void;
                  runOnMainThread(runnable: jsmacros.core.MethodWrapper<any,any,any,any>): void;
                  runOnMainThread(runnable: jsmacros.core.MethodWrapper<any,any,any,any>, watchdogMaxTime: long): void;
                  runOnMainThread(runnable: jsmacros.core.MethodWrapper<any,any,any,any>, await: boolean, watchdogMaxTime: long): void;
                  sendPacket(packet: net.minecraft.class_2596<any>): void;
                  setClipboard(text: string): void;
                  shutdown(): void;
                  waitTick(): void;
                  waitTick(i: int): void;
                }
                interface FClient extends CombineTypes<[_FClient, xyz.wagyourtail.jsmacros.core.library.PerExecLibrary]> {}
                interface _FHud$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  readonly overlays: java.util.Set<api.classes.render.IDraw2D<api.classes.render.Draw2D>>;
                  readonly renders: java.util.Set<api.classes.render.Draw3D>;
                  new(runner: jsmacros.core.Core<any,any>): FHud;
                }
                let FHud: _FHud$$static;
                interface _FHud {
                  clearDraw2Ds(): void;
                  clearDraw3Ds(): void;
                  createDraw2D(): api.classes.render.Draw2D;
                  createDraw3D(): api.classes.render.Draw3D;
                  createScreen(title: string, dirtBG: boolean): api.classes.render.ScriptScreen;
                  createTexture(width: int, height: int, name: string): api.classes.CustomImage;
                  createTexture(path: string, name: string): api.classes.CustomImage;
                  getMouseX(): double;
                  getMouseY(): double;
                  getOpenScreen(): api.classes.render.IScreen;
                  getOpenScreenName(): string;
                  getRegisteredTextures(): java.util.Map<string,api.classes.CustomImage>;
                  getScaleFactor(): int;
                  getWindowHeight(): int;
                  getWindowWidth(): int;
                  isContainer(): boolean;
                  listDraw2Ds(): java.util.List<api.classes.render.IDraw2D<api.classes.render.Draw2D>>;
                  listDraw3Ds(): java.util.List<api.classes.render.Draw3D>;
                  openScreen(s: api.classes.render.IScreen): void;
                  registerDraw2D(overlay: api.classes.render.IDraw2D<api.classes.render.Draw2D>): void;
                  registerDraw3D(draw: api.classes.render.Draw3D): void;
                  unregisterDraw2D(overlay: api.classes.render.IDraw2D<api.classes.render.Draw2D>): void;
                  unregisterDraw3D(draw: api.classes.render.Draw3D): void;
                }
                interface FHud extends CombineTypes<[_FHud, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
                interface _FKeyBind$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(runner: jsmacros.core.Core<any,any>): FKeyBind;
                }
                let FKeyBind: _FKeyBind$$static;
                interface _FKeyBind {
                  getKeyBindings(): java.util.Map<string,string>;
                  getKeyCode(keyName: string): net.minecraft.class_3675$class_306;
                  getPressedKeys(): java.util.Set<string>;
                  key(keyName: string, keyState: boolean): void;
                  _key(keyBind: net.minecraft.class_3675$class_306, keyState: boolean): void;
                  _key(keyBind: net.minecraft.class_304, keyState: boolean): void;
                  keyBind(keyBind: string, keyState: boolean): void;
                  pressKey(keyName: string): void;
                  pressKeyBind(keyBind: string): void;
                  releaseKey(keyName: string): void;
                  releaseKeyBind(keyBind: string): void;
                  setKeyBind(bind: string, key: string): void;
                }
                interface FKeyBind extends CombineTypes<[_FKeyBind, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
                interface _FKeyBind$KeyTracker$$static extends ClassLike {
                  getPressedKeys(): java.util.Set<string>;
                  press(key: net.minecraft.class_3675$class_306): void;
                  press(bind: net.minecraft.class_304): void;
                  unpress(key: net.minecraft.class_3675$class_306): void;
                  unpress(bind: net.minecraft.class_304): void;
                  _pressedKeys: java.util.Set<string>;
                  new(): FKeyBind$KeyTracker;
                }
                let FKeyBind$KeyTracker: _FKeyBind$KeyTracker$$static;
                interface _FKeyBind$KeyTracker {
                }
                interface FKeyBind$KeyTracker extends CombineTypes<[_FKeyBind$KeyTracker, java.lang.Object]> {}
                interface _FPlayer$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  new(runner: jsmacros.core.Core<any,any>): FPlayer;
                }
                let FPlayer: _FPlayer$$static;
                interface _FPlayer {
                  addInput(input: jsmacros.api.PlayerInput): void;
                  addInputs(inputs: jsmacros.api.PlayerInput[]): void;
                  clearInputs(): void;
                  createPlayerInput(): jsmacros.api.PlayerInput;
                  createPlayerInput(movementForward: double, a1: double, movementSideways: double): jsmacros.api.PlayerInput;
                  createPlayerInput(movementForward: double, a1: double, yaw: boolean, a3: boolean): jsmacros.api.PlayerInput;
                  createPlayerInput(movementForward: double, a1: double, movementSideways: double, a3: double, yaw: boolean, a5: boolean, pitch: boolean): jsmacros.api.PlayerInput;
                  createPlayerInputsFromCsv(csv: string): java.util.List<jsmacros.api.PlayerInput>;
                  createPlayerInputsFromJson(json: string): jsmacros.api.PlayerInput;
                  detailedRayTraceBlock(distance: double, a1: boolean): api.helper.world.HitResultHelper$Block;
                  getCurrentPlayerInput(): jsmacros.api.PlayerInput;
                  getGameMode(): string;
                  getInteractionManager(): api.helper.InteractionManagerHelper;
                  getPlayer(): api.helper.world.entity.ClientPlayerEntityHelper<net.minecraft.class_746>;
                  getReach(): double;
                  getStatistics(): api.helper.StatsHelper;
                  interactions(): api.helper.InteractionManagerHelper;
                  isBreakingBlock(): boolean;
                  moveBackward(yaw: double): void;
                  moveForward(yaw: double): void;
                  moveStrafeLeft(yaw: double): void;
                  moveStrafeRight(yaw: double): void;
                  openInventory(): api.classes.inventory.Inventory<any>;
                  predictInput(input: jsmacros.api.PlayerInput): jsmacros.api.math.Pos3D;
                  predictInput(input: jsmacros.api.PlayerInput, draw: boolean): jsmacros.api.math.Pos3D;
                  predictInputs(inputs: jsmacros.api.PlayerInput[]): java.util.List<jsmacros.api.math.Pos3D>;
                  predictInputs(inputs: jsmacros.api.PlayerInput[], draw: boolean): java.util.List<jsmacros.api.math.Pos3D>;
                  rayTraceBlock(distance: double, a1: boolean): api.helper.world.BlockDataHelper;
                  rayTraceEntity(): api.helper.world.entity.EntityHelper<any>;
                  rayTraceEntity(distance: int): api.helper.world.entity.EntityHelper<any>;
                  setDrawPredictions(val: boolean): void;
                  setGameMode(gameMode: string): void;
                  takePanorama(folder: string, width: int, height: int, callback: jsmacros.core.MethodWrapper<api.helper.TextHelper,any,any,any>): void;
                  takeScreenshot(folder: string, callback: jsmacros.core.MethodWrapper<api.helper.TextHelper,any,any,any>): void;
                  takeScreenshot(folder: string, file: string, callback: jsmacros.core.MethodWrapper<api.helper.TextHelper,any,any,any>): void;
                  writeSign(l1: string, l2: string, l3: string, l4: string): boolean;
                  writeSign(index: int, message: string): boolean;
                }
                interface FPlayer extends CombineTypes<[_FPlayer, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
                interface _FPositionCommon$$static extends ClassLike {
                  new(runner: jsmacros.core.Core<any,any>): FPositionCommon;
                }
                let FPositionCommon: _FPositionCommon$$static;
                interface _FPositionCommon {
                  createBlockPos(x: int, y: int, z: int): api.helper.world.BlockPosHelper;
                  createLookingVector(entity: api.helper.world.entity.EntityHelper<any>): jsmacros.api.math.Vec3D;
                  createLookingVector(yaw: double, a1: double): jsmacros.api.math.Vec3D;
                  createPos(x: double, a1: double, y: double): jsmacros.api.math.Pos3D;
                  createPos(x: double, a1: double): jsmacros.api.math.Pos2D;
                  createVec(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): jsmacros.api.math.Vec3D;
                  createVec(x1: double, a1: double, y1: double, a3: double): jsmacros.api.math.Vec2D;
                }
                interface FPositionCommon extends CombineTypes<[_FPositionCommon, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
                interface _FWorld$$static extends ClassLike {
                  _mc: net.minecraft.class_310;
                  server15MAverageTPS: double;
                  server1MAverageTPS: double;
                  server5MAverageTPS: double;
                  serverInstantTPS: double;
                  new(runner: jsmacros.core.Core<any,any>): FWorld;
                }
                let FWorld: _FWorld$$static;
                interface _FWorld {
                  findBlocksMatching(centerX: int, centerZ: int, id: string, chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  findBlocksMatching(id: string, chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  findBlocksMatching(ids: string[], chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  findBlocksMatching(centerX: int, centerZ: int, ids: string[], chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  findBlocksMatching(blockFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockHelper,any,boolean,any>, stateFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockStateHelper,any,boolean,any>, chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  findBlocksMatching(chunkX: int, chunkZ: int, blockFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockHelper,any,boolean,any>, stateFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockStateHelper,any,boolean,any>, chunkrange: int): java.util.List<jsmacros.api.math.Pos3D>;
                  getBiome(): string;
                  getBiomeAt(x: int, z: int): string;
                  getBiomeAt(x: int, y: int, z: int): string;
                  getBlock(x: int, y: int, z: int): api.helper.world.BlockDataHelper;
                  getBlock(pos: jsmacros.api.math.Pos3D): api.helper.world.BlockDataHelper;
                  getBlock(pos: api.helper.world.BlockPosHelper): api.helper.world.BlockDataHelper;
                  getBlockLight(x: int, y: int, z: int): int;
                  getBossBars(): java.util.Map<string,api.helper.world.entity.BossBarHelper>;
                  getChunk(x: int, z: int): api.helper.world.ChunkHelper;
                  getCurrentServerAddress(): string;
                  getDifficulty(): int;
                  getDimension(): string;
                  getEntities(): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(types: string[]): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(...types: string[]): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(distance: double): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(distance: double, a1: string[]): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(distance: double, ...a1: string[]): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getEntities(filter: jsmacros.core.MethodWrapper<api.helper.world.entity.EntityHelper<any>,any,any,any>): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  _getEntitiesInternal(filter: java.util.function.Predicate<net.minecraft.class_1297>): java.util.List<api.helper.world.entity.EntityHelper<any>>;
                  getLoadedPlayers(): java.util.List<api.helper.world.entity.PlayerEntityHelper<net.minecraft.class_1657>>;
                  getMoonPhase(): int;
                  getPlayerEntry(name: string): api.helper.world.PlayerListEntryHelper;
                  getPlayers(): java.util.List<api.helper.world.PlayerListEntryHelper>;
                  getRaw(): net.minecraft.class_638;
                  getRespawnPos(): api.helper.world.BlockPosHelper;
                  getScoreboards(): api.helper.world.ScoreboardsHelper;
                  getServer15MAverageTPS(): double;
                  getServer1MAverageTPS(): double;
                  getServer5MAverageTPS(): double;
                  getServerInstantTPS(): double;
                  getServerTPS(): string;
                  getSkyLight(x: int, y: int, z: int): int;
                  getTabListFooter(): api.helper.TextHelper;
                  getTabListHeader(): api.helper.TextHelper;
                  getTime(): long;
                  getTimeOfDay(): long;
                  getWorldIdentifier(): string;
                  getWorldScanner(): api.classes.worldscanner.WorldScannerBuilder;
                  getWorldScanner(blockFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockHelper,any,boolean,any>, stateFilter: jsmacros.core.MethodWrapper<api.helper.world.BlockStateHelper,any,boolean,any>): api.classes.worldscanner.WorldScanner;
                  isChunkLoaded(chunkX: int, chunkZ: int): boolean;
                  isDay(): boolean;
                  isNight(): boolean;
                  isRaining(): boolean;
                  isThundering(): boolean;
                  isWorldLoaded(): boolean;
                  iterateBox(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper, callback: jsmacros.core.MethodWrapper<api.helper.world.BlockDataHelper,any,any,any>): void;
                  iterateBox(pos1: api.helper.world.BlockPosHelper, pos2: api.helper.world.BlockPosHelper, ignoreAir: boolean, callback: jsmacros.core.MethodWrapper<api.helper.world.BlockDataHelper,any,any,any>): void;
                  iterateSphere(pos: api.helper.world.BlockPosHelper, radius: int, callback: jsmacros.core.MethodWrapper<api.helper.world.BlockDataHelper,any,any,any>): void;
                  iterateSphere(pos: api.helper.world.BlockPosHelper, radius: int, ignoreAir: boolean, callback: jsmacros.core.MethodWrapper<api.helper.world.BlockDataHelper,any,any,any>): void;
                  playSound(id: string): void;
                  playSound(id: string, volume: double): void;
                  playSound(id: string, volume: double, a2: double): void;
                  playSound(id: string, volume: double, a2: double, pitch: double, a4: double, x: double): void;
                  playSoundFile(file: string, volume: double): javax.sound.sampled.Clip;
                  rayTraceBlock(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double, x2: boolean): api.helper.world.BlockDataHelper;
                  rayTraceEntity(x1: double, a1: double, y1: double, a3: double, z1: double, a5: double): api.helper.world.entity.EntityHelper<any>;
                  spawnParticle(id: string, x: double, a2: double, y: double, a4: int): void;
                  spawnParticle(id: string, x: double, a2: double, y: double, a4: double, z: double, a6: double, deltaX: double, a8: int, deltaY: boolean): void;
                  _tryCopyEntities(world: net.minecraft.class_638, tried: int): java.util.List<net.minecraft.class_1297>;
                }
                interface FWorld extends CombineTypes<[_FWorld, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
              }
            }
          }
          module config {
            interface _ClientConfigV2$$static extends ClassLike {
              new(): ClientConfigV2;
            }
            let ClientConfigV2: _ClientConfigV2$$static;
            interface _ClientConfigV2 {
              fromV1(v1: com.google.gson.JsonObject): void;
              getFonts(): java.util.List<string>;
              getServiceSortComparator(): java.util.Comparator<string>;
              getSortComparator(): java.util.Comparator<jsmacros.core.config.ScriptTrigger>;
              getThemeData(): java.util.Map<string,short[]>;
              languages(): java.util.List<string>;
              setServiceAutoReload(value: boolean): void;
              disableKeyWhenScreenOpen: boolean;
              editorFont: string;
              editorHistorySize: int;
              editorLinterOverrides: java.util.Map<string,string>;
              editorSuggestions: boolean;
              editorTheme: java.util.Map<string,short[]>;
              externalEditor: boolean;
              externalEditorCommand: string;
              serviceAutoReload: boolean;
              showRunningServices: boolean;
              showSlotIndexes: boolean;
              sortMethod: Sorting$MacroSortMethod;
              sortServicesMethod: Sorting$ServiceSortMethod;
            }
            interface ClientConfigV2 extends CombineTypes<[_ClientConfigV2, java.lang.Object]> {}
            interface _ClientProfile$$static extends ClassLike {
              ignoredErrors: java.lang.Class<java.lang.Throwable>[];
              _mc: net.minecraft.class_310;
              new(runner: jsmacros.core.Core<ClientProfile,any>, logger: org.slf4j.Logger): ClientProfile;
            }
            let ClientProfile: _ClientProfile$$static;
            interface _ClientProfile {
              checkJoinedThreadStack(): boolean;
              _compileError(ex: jsmacros.core.language.BaseWrappedException<any>): net.minecraft.class_2561;
              initRegistries(): void;
              _loadProfile(profileName: string): boolean;
              logError(ex: java.lang.Throwable): void;
            }
            interface ClientProfile extends CombineTypes<[_ClientProfile, xyz.wagyourtail.jsmacros.core.config.BaseProfile]> {}
            interface _Sorting$$static extends ClassLike {
              new(): Sorting;
            }
            let Sorting: _Sorting$$static;
            interface _Sorting {
            }
            interface Sorting extends CombineTypes<[_Sorting, java.lang.Object]> {}
            interface _Sorting$MacroSortMethod$$static extends ClassLike {
              valueOf(name: string): Sorting$MacroSortMethod;
              values(): Sorting$MacroSortMethod[];
              readonly Enabled: Sorting$MacroSortMethod;
              readonly FileName: Sorting$MacroSortMethod;
              readonly TriggerName: Sorting$MacroSortMethod;
            }
            let Sorting$MacroSortMethod: _Sorting$MacroSortMethod$$static;
            interface _Sorting$MacroSortMethod {
            }
            interface Sorting$MacroSortMethod extends CombineTypes<[_Sorting$MacroSortMethod]> {}
            interface _Sorting$ServiceSortMethod$$static extends ClassLike {
              valueOf(name: string): Sorting$ServiceSortMethod;
              values(): Sorting$ServiceSortMethod[];
              readonly Enabled: Sorting$ServiceSortMethod;
              readonly FileName: Sorting$ServiceSortMethod;
              readonly Name: Sorting$ServiceSortMethod;
              readonly Running: Sorting$ServiceSortMethod;
            }
            let Sorting$ServiceSortMethod: _Sorting$ServiceSortMethod$$static;
            interface _Sorting$ServiceSortMethod {
            }
            interface Sorting$ServiceSortMethod extends CombineTypes<[_Sorting$ServiceSortMethod]> {}
            interface _Sorting$SortByEnabled$$static extends ClassLike {
              new(): Sorting$SortByEnabled;
            }
            let Sorting$SortByEnabled: _Sorting$SortByEnabled$$static;
            interface _Sorting$SortByEnabled {
              compare(a: jsmacros.core.config.ScriptTrigger, b: jsmacros.core.config.ScriptTrigger): int;
              compare(a0: any, a1: any): int;
            }
            interface Sorting$SortByEnabled extends CombineTypes<[_Sorting$SortByEnabled, java.util.Comparator<jsmacros.core.config.ScriptTrigger>, java.lang.Object]> {}
            interface _Sorting$SortByFileName$$static extends ClassLike {
              new(): Sorting$SortByFileName;
            }
            let Sorting$SortByFileName: _Sorting$SortByFileName$$static;
            interface _Sorting$SortByFileName {
              compare(a: jsmacros.core.config.ScriptTrigger, b: jsmacros.core.config.ScriptTrigger): int;
              compare(a0: any, a1: any): int;
            }
            interface Sorting$SortByFileName extends CombineTypes<[_Sorting$SortByFileName, java.util.Comparator<jsmacros.core.config.ScriptTrigger>, java.lang.Object]> {}
            interface _Sorting$SortByTriggerName$$static extends ClassLike {
              new(): Sorting$SortByTriggerName;
            }
            let Sorting$SortByTriggerName: _Sorting$SortByTriggerName$$static;
            interface _Sorting$SortByTriggerName {
              compare(a: jsmacros.core.config.ScriptTrigger, b: jsmacros.core.config.ScriptTrigger): int;
              compare(a0: any, a1: any): int;
            }
            interface Sorting$SortByTriggerName extends CombineTypes<[_Sorting$SortByTriggerName, java.util.Comparator<jsmacros.core.config.ScriptTrigger>, java.lang.Object]> {}
            interface _Sorting$SortServiceByEnabled$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): Sorting$SortServiceByEnabled;
            }
            let Sorting$SortServiceByEnabled: _Sorting$SortServiceByEnabled$$static;
            interface _Sorting$SortServiceByEnabled {
              compare(a: string, b: string): int;
              compare(a0: any, a1: any): int;
              _runner: jsmacros.core.Core<any,any>;
            }
            interface Sorting$SortServiceByEnabled extends CombineTypes<[_Sorting$SortServiceByEnabled, java.lang.Object, java.util.Comparator<string>]> {}
            interface _Sorting$SortServiceByFileName$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): Sorting$SortServiceByFileName;
            }
            let Sorting$SortServiceByFileName: _Sorting$SortServiceByFileName$$static;
            interface _Sorting$SortServiceByFileName {
              compare(a: string, b: string): int;
              compare(a0: any, a1: any): int;
              _runner: jsmacros.core.Core<any,any>;
            }
            interface Sorting$SortServiceByFileName extends CombineTypes<[_Sorting$SortServiceByFileName, java.lang.Object, java.util.Comparator<string>]> {}
            interface _Sorting$SortServiceByName$$static extends ClassLike {
              new(): Sorting$SortServiceByName;
            }
            let Sorting$SortServiceByName: _Sorting$SortServiceByName$$static;
            interface _Sorting$SortServiceByName {
              compare(a: string, b: string): int;
              compare(a0: any, a1: any): int;
            }
            interface Sorting$SortServiceByName extends CombineTypes<[_Sorting$SortServiceByName, java.lang.Object, java.util.Comparator<string>]> {}
            interface _Sorting$SortServiceByRunning$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): Sorting$SortServiceByRunning;
            }
            let Sorting$SortServiceByRunning: _Sorting$SortServiceByRunning$$static;
            interface _Sorting$SortServiceByRunning {
              compare(a: string, b: string): int;
              compare(a0: any, a1: any): int;
              _runner: jsmacros.core.Core<any,any>;
            }
            interface Sorting$SortServiceByRunning extends CombineTypes<[_Sorting$SortServiceByRunning, java.lang.Object, java.util.Comparator<string>]> {}
          }
          module event {
            interface _EventRegistry$$static extends ClassLike {
              new(runner: jsmacros.core.Core<any,any>): EventRegistry;
            }
            let EventRegistry: _EventRegistry$$static;
            interface _EventRegistry {
              addScriptTrigger(rawmacro: jsmacros.core.config.ScriptTrigger): void;
              getScriptTriggers(): java.util.List<jsmacros.core.config.ScriptTrigger>;
              removeScriptTrigger(rawmacro: jsmacros.core.config.ScriptTrigger): boolean;
            }
            interface EventRegistry extends CombineTypes<[_EventRegistry, xyz.wagyourtail.jsmacros.core.event.BaseEventRegistry]> {}
          }
          module gui {
            module containers {
              interface _MacroContainer$$static extends ClassLike {
                buildKeyName(translationKeys: string): net.minecraft.class_2561;
                _getTranslatedEventName(eventName: string): net.minecraft.class_2561;
                _event_tex: net.minecraft.class_2960;
                _key_both_tex: net.minecraft.class_2960;
                _key_down_tex: net.minecraft.class_2960;
                _key_up_tex: net.minecraft.class_2960;
                _script_fork_tex: net.minecraft.class_2960;
                _script_join_tex: net.minecraft.class_2960;
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, macro: jsmacros.core.config.ScriptTrigger, parent: gui.screens.MacroScreen): MacroContainer;
              }
              let MacroContainer: _MacroContainer$$static;
              interface _MacroContainer {
                getRawMacro(): jsmacros.core.config.ScriptTrigger;
                init(): void;
                onKey(translationKey: string): boolean;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                setEventType(type: string): void;
                setFile(f: java.io.File): void;
                setKey(translationKeys: string): void;
                setPos(x: int, y: int, width: int, height: int): void;
                _delBtn: wagyourtail.wagyourgui.elements.Button;
                _editBtn: wagyourtail.wagyourgui.elements.Button;
                _enableBtn: wagyourtail.wagyourgui.elements.Button;
                _fileBtn: wagyourtail.wagyourgui.elements.Button;
                _joinedBtn: wagyourtail.wagyourgui.elements.Button;
                _keyBtn: wagyourtail.wagyourgui.elements.Button;
                _keyStateBtn: wagyourtail.wagyourgui.elements.Button;
                _macro: jsmacros.core.config.ScriptTrigger;
                _mc: net.minecraft.class_310;
                _selectkey: boolean;
              }
              interface MacroContainer extends CombineTypes<[_MacroContainer, wagyourtail.wagyourgui.containers.MultiElementContainer<gui.screens.MacroScreen>]> {}
              interface _MacroListTopbar$$static extends ClassLike {
                new(parent: gui.screens.MacroScreen, x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, deftype: jsmacros.core.config.ScriptTrigger$TriggerType): MacroListTopbar;
              }
              let MacroListTopbar: _MacroListTopbar$$static;
              interface _MacroListTopbar {
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                updateType(type: jsmacros.core.config.ScriptTrigger$TriggerType): void;
                deftype: jsmacros.core.config.ScriptTrigger$TriggerType;
                _type: wagyourtail.wagyourgui.elements.Button;
              }
              interface MacroListTopbar extends CombineTypes<[_MacroListTopbar, wagyourtail.wagyourgui.containers.MultiElementContainer<gui.screens.MacroScreen>]> {}
              interface _RunningContextContainer$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: gui.screens.CancelScreen, t: jsmacros.core.language.BaseScriptContext<any>): RunningContextContainer;
              }
              let RunningContextContainer: _RunningContextContainer$$static;
              interface _RunningContextContainer {
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                setPos(x: int, y: int, width: int, height: int): void;
                _cancelButton: wagyourtail.wagyourgui.elements.Button;
                service: boolean;
                t: jsmacros.core.language.BaseScriptContext<any>;
              }
              interface RunningContextContainer extends CombineTypes<[_RunningContextContainer, wagyourtail.wagyourgui.containers.MultiElementContainer<gui.screens.CancelScreen>]> {}
              interface _ServiceContainer$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: gui.screens.ServiceScreen, service: string): ServiceContainer;
              }
              let ServiceContainer: _ServiceContainer$$static;
              interface _ServiceContainer {
                getEnabled(): boolean;
                getRunning(): boolean;
                getTrigger(): jsmacros.core.service.ServiceTrigger;
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                setFile(file: java.io.File): void;
                setPos(x: int, y: int, width: int, height: int): void;
                _delBtn: wagyourtail.wagyourgui.elements.Button;
                _enableBtn: wagyourtail.wagyourgui.elements.Button;
                _fileBtn: wagyourtail.wagyourgui.elements.Button;
                _nameBtn: wagyourtail.wagyourgui.elements.Button;
                _runningBtn: wagyourtail.wagyourgui.elements.Button;
                service: string;
              }
              interface ServiceContainer extends CombineTypes<[_ServiceContainer, wagyourtail.wagyourgui.containers.MultiElementContainer<gui.screens.MacroScreen>]> {}
              interface _ServiceListTopbar$$static extends ClassLike {
                new(parent: gui.screens.ServiceScreen, x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327): ServiceListTopbar;
              }
              let ServiceListTopbar: _ServiceListTopbar$$static;
              interface _ServiceListTopbar {
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
              }
              interface ServiceListTopbar extends CombineTypes<[_ServiceListTopbar, wagyourtail.wagyourgui.containers.MultiElementContainer<gui.screens.ServiceScreen>]> {}
            }
            module editor {
              module highlighting {
                module impl {
                  interface _AutoCompleteSuggester$$static extends ClassLike {
                    new(language: string): AutoCompleteSuggester;
                  }
                  let AutoCompleteSuggester: _AutoCompleteSuggester$$static;
                  interface _AutoCompleteSuggester {
                    _generateSuggestionTree(): void;
                    getSuggestions(start: string): java.util.Set<string>;
                    _language: string;
                    _method_separator: string;
                    _suggestions: StringHashTrie;
                  }
                  interface AutoCompleteSuggester extends CombineTypes<[_AutoCompleteSuggester, java.lang.Object]> {}
                  interface _DefaultCodeCompiler$$static extends ClassLike {
                    new(language: string, screen: gui.screens.EditorScreen): DefaultCodeCompiler;
                  }
                  let DefaultCodeCompiler: _DefaultCodeCompiler$$static;
                  interface _DefaultCodeCompiler {
                    getRenderedText(): net.minecraft.class_2561[];
                    getRightClickOptions(index: int): java.util.Map<string,java.lang.Runnable>;
                    getSuggestions(): java.util.List<AutoCompleteSuggestion>;
                    recompileRenderedText(text: string): void;
                    _compiledText: net.minecraft.class_2561[];
                    _suggester: AutoCompleteSuggester;
                    _suggestions: java.util.List<AutoCompleteSuggestion>;
                    _themeData: java.util.Map<string,short[]>;
                  }
                  interface DefaultCodeCompiler extends CombineTypes<[_DefaultCodeCompiler, xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AbstractRenderCodeCompiler]> {}
                  interface _NoStyleCodeCompiler$$static extends ClassLike {
                    new(language: string, screen: gui.screens.EditorScreen): NoStyleCodeCompiler;
                  }
                  let NoStyleCodeCompiler: _NoStyleCodeCompiler$$static;
                  interface _NoStyleCodeCompiler {
                    getRenderedText(): net.minecraft.class_2561[];
                    getRightClickOptions(index: int): java.util.Map<string,java.lang.Runnable>;
                    getSuggestions(): java.util.List<AutoCompleteSuggestion>;
                    recompileRenderedText(text: string): void;
                    _compiledText: net.minecraft.class_2561[];
                  }
                  interface NoStyleCodeCompiler extends CombineTypes<[_NoStyleCodeCompiler, xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AbstractRenderCodeCompiler]> {}
                  interface _TextStyleCompiler$$static extends ClassLike {
                    new(defaultStyle: net.minecraft.class_2583, themeData: java.util.Map<string,short[]>): TextStyleCompiler;
                  }
                  let TextStyleCompiler: _TextStyleCompiler$$static;
                  interface _TextStyleCompiler {
                    _appendChildResult(childResult: java.util.List<net.minecraft.class_5250>): void;
                    _colorForSyntax(name: string, alias: string): net.minecraft.class_5251;
                    _getColorForToken(name: string): net.minecraft.class_5251;
                    getResult(): java.util.List<net.minecraft.class_5250>;
                    _visitSyntax(syntax: io.noties.prism4j.Prism4j$Syntax): void;
                    _visitText(text: io.noties.prism4j.Prism4j$Text): void;
                    _defaultStyle: net.minecraft.class_2583;
                    _result: java.util.List<net.minecraft.class_5250>;
                    _themeData: java.util.Map<string,short[]>;
                  }
                  interface TextStyleCompiler extends CombineTypes<[_TextStyleCompiler, io.noties.prism4j.AbsVisitor]> {}
                }
                module scriptimpl {
                  interface _CodeCompileEvent$$static extends ClassLike {
                    new(code: string, language: string, screen: gui.screens.EditorScreen): CodeCompileEvent;
                  }
                  let CodeCompileEvent: _CodeCompileEvent$$static;
                  interface _CodeCompileEvent {
                    createMap(): java.util.Map<any,any>;
                    createPrefixTree(): StringHashTrie;
                    createSuggestion(startIndex: int, suggestion: string): AutoCompleteSuggestion;
                    createSuggestion(startIndex: int, suggestion: string, displayText: client.api.helper.TextHelper): AutoCompleteSuggestion;
                    createTextBuilder(): client.api.classes.TextBuilder;
                    genPrismNodes(): java.util.List<io.noties.prism4j.Prism4j$Node>;
                    getThemeData(): java.util.Map<string,short[]>;
                    readonly autoCompleteSuggestions: java.util.List<AutoCompleteSuggestion>;
                    readonly code: string;
                    readonly cursor: SelectCursor;
                    readonly language: string;
                    rightClickActions: jsmacros.core.MethodWrapper<int,any,java.util.Map<string,jsmacros.core.MethodWrapper<any,any,any,any>>,any>;
                    readonly screen: gui.screens.EditorScreen;
                    readonly textLines: java.util.List<client.api.helper.TextHelper>;
                  }
                  interface CodeCompileEvent extends CombineTypes<[_CodeCompileEvent, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
                  interface _ScriptCodeCompiler$$static extends ClassLike {
                    new(language: string, screen: gui.screens.EditorScreen, scriptFile: java.io.File): ScriptCodeCompiler;
                  }
                  let ScriptCodeCompiler: _ScriptCodeCompiler$$static;
                  interface _ScriptCodeCompiler {
                    getRenderedText(): net.minecraft.class_2561[];
                    getRightClickOptions(index: int): java.util.Map<string,java.lang.Runnable>;
                    getSuggestions(): java.util.List<AutoCompleteSuggestion>;
                    recompileRenderedText(text: string): void;
                    _compiledText: net.minecraft.class_2561[];
                    _getRClickActions: jsmacros.core.MethodWrapper<int,any,java.util.Map<string,jsmacros.core.MethodWrapper<any,any,any,any>>,any>;
                    _scriptTrigger: jsmacros.core.config.ScriptTrigger;
                    _suggestions: java.util.List<AutoCompleteSuggestion>;
                  }
                  interface ScriptCodeCompiler extends CombineTypes<[_ScriptCodeCompiler, xyz.wagyourtail.jsmacros.client.gui.editor.highlighting.AbstractRenderCodeCompiler]> {}
                }
                interface _AbstractRenderCodeCompiler$$static extends ClassLike {
                  new(language: string, screen: gui.screens.EditorScreen): AbstractRenderCodeCompiler;
                }
                let AbstractRenderCodeCompiler: _AbstractRenderCodeCompiler$$static;
                interface _AbstractRenderCodeCompiler {
                  getRenderedText(): net.minecraft.class_2561[];
                  getRightClickOptions(a0: int): java.util.Map<string,java.lang.Runnable>;
                  getSuggestions(): java.util.List<AutoCompleteSuggestion>;
                  recompileRenderedText(a0: string): void;
                  _language: string;
                  _screen: gui.screens.EditorScreen;
                }
                interface AbstractRenderCodeCompiler extends CombineTypes<[_AbstractRenderCodeCompiler, java.lang.Object]> {}
                interface _AutoCompleteSuggestion$$static extends ClassLike {
                  new(startIndex: int, suggestion: string): AutoCompleteSuggestion;
                  new(startIndex: int, suggestion: string, displayText: net.minecraft.class_2561): AutoCompleteSuggestion;
                }
                let AutoCompleteSuggestion: _AutoCompleteSuggestion$$static;
                interface _AutoCompleteSuggestion {
                  readonly displayText: net.minecraft.class_2561;
                  readonly startIndex: int;
                  readonly suggestion: string;
                }
                interface AutoCompleteSuggestion extends CombineTypes<[_AutoCompleteSuggestion, java.lang.Object]> {}
                interface _Prism$$static extends ClassLike {
                  getNodes(text: string, language: string): java.util.List<io.noties.prism4j.Prism4j$Node>;
                  _prism4j: io.noties.prism4j.Prism4j;
                  new(): Prism;
                }
                let Prism: _Prism$$static;
                interface _Prism {
                  grammar(prism4j: io.noties.prism4j.Prism4j, language: string): io.noties.prism4j.Prism4j$Grammar;
                  languages(): java.util.Set<string>;
                }
                interface Prism extends CombineTypes<[_Prism, java.lang.Object, io.noties.prism4j.GrammarLocator]> {}
              }
              interface _History$$static extends ClassLike {
                new(start: string, cursor: SelectCursor): History;
              }
              let History: _History$$static;
              interface _History {
                add(position: int, content: string): boolean;
                addChar(position: int, content: char): boolean;
                bkspacePos(position: int, length: int): boolean;
                deletePos(position: int, length: int): boolean;
                redo(): int;
                replace(position: int, length: int, content: string): void;
                shiftLine(startLine: int, lines: int, shiftDown: boolean): boolean;
                tabLines(startLine: int, lineCount: int, reverse: boolean): void;
                tabLinesKeepCursor(startLine: int, startLineIndex: int, endLineIndex: int, lineCount: int, reverse: boolean): void;
                undo(): int;
                _MAX_UNDO: int;
                current: string;
                _cursor: SelectCursor;
                onChange: java.util.function.Consumer<string>;
                _redo: java.util.List<History$HistoryStep>;
                _undo: java.util.List<History$HistoryStep>;
              }
              interface History extends CombineTypes<[_History, java.lang.Object]> {}
              interface _History$Add$$static extends ClassLike {
                _new(position: int, added: string, cursor: SelectCursor): History$Add;
              }
              let History$Add: _History$Add$$static;
              interface _History$Add {
                _applyStep(input: string): string;
                _unApplyStep(input: string): string;
                _added: string;
              }
              interface History$Add extends CombineTypes<[_History$Add, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _History$HistoryStep$$static extends ClassLike {
                _new(): History$HistoryStep;
              }
              let History$HistoryStep: _History$HistoryStep$$static;
              interface _History$HistoryStep {
                _applyStep(a0: string): string;
                _unApplyStep(a0: string): string;
                _cursor: SelectCursor;
                _position: int;
              }
              interface History$HistoryStep extends CombineTypes<[_History$HistoryStep, java.lang.Object]> {}
              interface _History$Remove$$static extends ClassLike {
                _new(position: int, length: int, isBkspace: boolean, cursor: SelectCursor): History$Remove;
              }
              let History$Remove: _History$Remove$$static;
              interface _History$Remove {
                _applyStep(input: string): string;
                _unApplyStep(input: string): string;
                _isBkspace: boolean;
                _length: int;
                _removed: string;
              }
              interface History$Remove extends CombineTypes<[_History$Remove, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _History$Replace$$static extends ClassLike {
                _new(position: int, length: int, newContent: string, cursor: SelectCursor): History$Replace;
              }
              let History$Replace: _History$Replace$$static;
              interface _History$Replace {
                _applyStep(input: string): string;
                _unApplyStep(input: string): string;
                _length: int;
                _newContent: string;
                _oldContent: string;
              }
              interface History$Replace extends CombineTypes<[_History$Replace, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _History$ShiftLine$$static extends ClassLike {
                _new(startLine: int, lineCount: int, shiftAmount: int, shiftDown: boolean, cursor: SelectCursor): History$ShiftLine;
              }
              let History$ShiftLine: _History$ShiftLine$$static;
              interface _History$ShiftLine {
                _applyStep(input: string): string;
                _shift(input: string, startLine: int, lineCount: int, shiftAmount: int, shiftDown: boolean): string;
                _unApplyStep(input: string): string;
                _lineCount: int;
                _shiftAmount: int;
                _shiftDown: boolean;
                _startLine: int;
              }
              interface History$ShiftLine extends CombineTypes<[_History$ShiftLine, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _History$TabLines$$static extends ClassLike {
                new(startLine: int, lineCount: int, reversed: boolean, cursor: SelectCursor): History$TabLines;
              }
              let History$TabLines: _History$TabLines$$static;
              interface _History$TabLines {
                _applyStep(input: string): string;
                _tab(input: string, startLine: int, lineCount: int, reversed: boolean): string;
                _unApplyStep(input: string): string;
                _lineCount: int;
                _reversed: boolean;
                _startLine: int;
              }
              interface History$TabLines extends CombineTypes<[_History$TabLines, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _History$TabLinesKeepCursor$$static extends ClassLike {
                new(startLine: int, startLineIndex: int, endLineIndex: int, lineCount: int, reversed: boolean, cursor: SelectCursor): History$TabLinesKeepCursor;
              }
              let History$TabLinesKeepCursor: _History$TabLinesKeepCursor$$static;
              interface _History$TabLinesKeepCursor {
                _applyStep(input: string): string;
                _tab(input: string, startLine: int, lineCount: int, reversed: boolean, undo: boolean): string;
                _unApplyStep(input: string): string;
                _endLineIndex: int;
                _lineCount: int;
                _reversed: boolean;
                _startLine: int;
                _startLineIndex: int;
              }
              interface History$TabLinesKeepCursor extends CombineTypes<[_History$TabLinesKeepCursor, xyz.wagyourtail.jsmacros.client.gui.editor.History$HistoryStep]> {}
              interface _SelectCursor$$static extends ClassLike {
                new(defaultStyle: net.minecraft.class_2583): SelectCursor;
              }
              let SelectCursor: _SelectCursor$$static;
              interface _SelectCursor {
                updateEndIndex(endIndex: int, current: string): void;
                updateStartIndex(startIndex: int, current: string): void;
                arrowEnd: boolean;
                arrowLineIndex: int;
                defaultStyle: net.minecraft.class_2583;
                dragStartIndex: int;
                endCol: int;
                endIndex: int;
                endLine: int;
                endLineIndex: int;
                _mc: net.minecraft.class_310;
                onChange: java.util.function.Consumer<SelectCursor>;
                startCol: int;
                startIndex: int;
                startLine: int;
                startLineIndex: int;
              }
              interface SelectCursor extends CombineTypes<[_SelectCursor, java.lang.Object]> {}
            }
            module overlays {
              interface _AboutOverlay$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: wagyourtail.wagyourgui.overlays.IOverlayParent): AboutOverlay;
              }
              let AboutOverlay: _AboutOverlay$$static;
              interface _AboutOverlay {
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                _renderMessage(drawContext: net.minecraft.class_332): void;
                setMessage(message: net.minecraft.class_2561): void;
                _lines: int;
                _text: java.util.List<net.minecraft.class_5481>;
                _vcenter: int;
              }
              interface AboutOverlay extends CombineTypes<[_AboutOverlay, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
              interface _EventChooser$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, selected: string, parent: wagyourtail.wagyourgui.overlays.IOverlayParent, setEvent: java.util.function.Consumer<string>): EventChooser;
              }
              let EventChooser: _EventChooser$$static;
              interface _EventChooser {
                addEvent(eventName: string): void;
                init(): void;
                onScrollbar(page: double): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                selectEvent(event: string): void;
                updateEventPos(): void;
                _eventText: net.minecraft.class_2561;
                _events: java.util.List<EventChooser$EventObj>;
                _selected: string;
                _setEvent: java.util.function.Consumer<string>;
                _topScroll: int;
              }
              interface EventChooser extends CombineTypes<[_EventChooser, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
              interface _EventChooser$EventObj$$static extends ClassLike {
                new(event: string, btn: wagyourtail.wagyourgui.elements.Button): EventChooser$EventObj;
              }
              let EventChooser$EventObj: _EventChooser$EventObj$$static;
              interface _EventChooser$EventObj {
                _btn: wagyourtail.wagyourgui.elements.Button;
                _event: string;
              }
              interface EventChooser$EventObj extends CombineTypes<[_EventChooser$EventObj, java.lang.Object]> {}
              interface _FileChooser$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, directory: java.io.File, selected: java.io.File, parent: wagyourtail.wagyourgui.overlays.IOverlayParent, setFile: java.util.function.Consumer<java.io.File>, editFile: java.util.function.Consumer<java.io.File>): FileChooser;
              }
              let FileChooser: _FileChooser$$static;
              interface _FileChooser {
                addFile(f: java.io.File): void;
                addFile(f: java.io.File, btnText: string): void;
                confirmDelete(f: FileChooser$fileObj): void;
                delete(f: FileChooser$fileObj): void;
                init(): void;
                onScrollbar(page: double): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                selectFile(f: java.io.File): void;
                setDir(dir: java.io.File): void;
                updateFilePos(): void;
                _directory: java.io.File;
                _dirname: net.minecraft.class_2561;
                _editFile: java.util.function.Consumer<java.io.File>;
                _files: java.util.List<FileChooser$fileObj>;
                root: java.io.File;
                _selected: java.io.File;
                _setFile: java.util.function.Consumer<java.io.File>;
                _topScroll: int;
              }
              interface FileChooser extends CombineTypes<[_FileChooser, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
              interface _FileChooser$fileObj$$static extends ClassLike {
                new(file: java.io.File, btn: wagyourtail.wagyourgui.elements.Button): FileChooser$fileObj;
              }
              let FileChooser$fileObj: _FileChooser$fileObj$$static;
              interface _FileChooser$fileObj {
                btn: wagyourtail.wagyourgui.elements.Button;
                file: java.io.File;
              }
              interface FileChooser$fileObj extends CombineTypes<[_FileChooser$fileObj, java.lang.Object]> {}
              interface _FileChooser$sortFile$$static extends ClassLike {
                new(): FileChooser$sortFile;
              }
              let FileChooser$sortFile: _FileChooser$sortFile$$static;
              interface _FileChooser$sortFile {
                compare(a: java.io.File, b: java.io.File): int;
                compare(a0: any, a1: any): int;
              }
              interface FileChooser$sortFile extends CombineTypes<[_FileChooser$sortFile, java.util.Comparator<java.io.File>, java.lang.Object]> {}
              interface _TextOverlay$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: wagyourtail.wagyourgui.overlays.IOverlayParent, text: net.minecraft.class_2561): TextOverlay;
              }
              let TextOverlay: _TextOverlay$$static;
              interface _TextOverlay {
                init(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                centered: boolean;
                _text: net.minecraft.class_2561;
              }
              interface TextOverlay extends CombineTypes<[_TextOverlay, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
            }
            module screens {
              interface _CancelScreen$$static extends ClassLike {
                new(parent: net.minecraft.class_437): CancelScreen;
              }
              let CancelScreen: _CancelScreen$$static;
              interface _CancelScreen {
                addContainer(t: jsmacros.core.language.BaseScriptContext<any>): void;
                method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                method_25401(mouseX: double, a1: double, mouseY: double, a3: double): boolean;
                method_25419(): void;
                method_25426(): void;
                method_25432(): void;
                _onScrollbar(page: double): void;
                removeContainer(t: gui.containers.RunningContextContainer): void;
                updatePos(): void;
                _running: java.util.List<gui.containers.RunningContextContainer>;
                _s: wagyourtail.wagyourgui.elements.Scrollbar;
                _services: wagyourtail.wagyourgui.elements.AnnotatedCheckBox;
                _topScroll: int;
              }
              interface CancelScreen extends CombineTypes<[_CancelScreen, xyz.wagyourtail.wagyourgui.BaseScreen]> {}
              interface _CancelScreen$RTCSort$$static extends ClassLike {
                new(): CancelScreen$RTCSort;
              }
              let CancelScreen$RTCSort: _CancelScreen$RTCSort$$static;
              interface _CancelScreen$RTCSort {
                compare(arg0: gui.containers.RunningContextContainer, arg1: gui.containers.RunningContextContainer): int;
                compare(a0: any, a1: any): int;
              }
              interface CancelScreen$RTCSort extends CombineTypes<[_CancelScreen$RTCSort, java.util.Comparator<gui.containers.RunningContextContainer>, java.lang.Object]> {}
              interface _EditorScreen$$static extends ClassLike {
                openAndScrollToIndex(file: java.io.File, startIndex: int, endIndex: int): void;
                openAndScrollToLine(file: java.io.File, line: int, col: int, endCol: int): void;
                defaultStyle: net.minecraft.class_2583;
                _ellipses: net.minecraft.class_5481;
                readonly langs: java.util.List<string>;
                new(parent: net.minecraft.class_437, file: java.io.File): EditorScreen;
              }
              let EditorScreen: _EditorScreen$$static;
              interface _EditorScreen {
                _calcTotalPages(): double;
                _compileRenderedText(): void;
                copyToClipboard(): void;
                _countCharAfter(chr: char, startIndex: int): int;
                _countCharBefore(chr: char, startIndex: int): int;
                cutToClipboard(): void;
                getDefaultLanguage(): string;
                _getIndexPosition(x: double, a1: double): int;
                method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                method_25400(chr: char, keyCode: int): boolean;
                method_25401(mouseX: double, a1: double, mouseY: double, a3: double): boolean;
                method_25402(mouseX: double, a1: double, mouseY: int): boolean;
                method_25403(mouseX: double, a1: double, mouseY: int, a3: double, button: double): boolean;
                method_25404(keyCode: int, scanCode: int, modifiers: int): boolean;
                method_25426(): void;
                needSave(): boolean;
                openParent(): void;
                _openRClickMenu(index: int, mouseX: int, mouseY: int): void;
                pasteFromClipboard(): void;
                save(): void;
                scrollToCursor(): void;
                selectWordAtCursor(): void;
                setLanguage(language: string): void;
                setScroll(pages: double): void;
                _trim(text: net.minecraft.class_2561): net.minecraft.class_5481;
                updateSettings(): void;
                blockFirst: boolean;
                codeCompiler: gui.editor.highlighting.AbstractRenderCodeCompiler;
                readonly cursor: gui.editor.SelectCursor;
                _ellipsesWidth: int;
                _file: java.io.File;
                _fileName: net.minecraft.class_2561;
                _firstLine: int;
                _handler: jsmacros.core.library.impl.classes.FileHandler;
                readonly history: gui.editor.History;
                language: string;
                _lastLine: int;
                _lineCol: string;
                _lineSpread: int;
                prevChar: char;
                _saveBtn: wagyourtail.wagyourgui.elements.Button;
                _savedString: string;
                _scroll: int;
                _scrollbar: wagyourtail.wagyourgui.elements.Scrollbar;
                textRenderTime: long;
              }
              interface EditorScreen extends CombineTypes<[_EditorScreen, xyz.wagyourtail.wagyourgui.BaseScreen]> {}
              interface _EventMacrosScreen$$static extends ClassLike {
                new(parent: net.minecraft.class_437): EventMacrosScreen;
              }
              let EventMacrosScreen: _EventMacrosScreen$$static;
              interface _EventMacrosScreen {
                _method_25426(): void;
              }
              interface EventMacrosScreen extends CombineTypes<[_EventMacrosScreen, xyz.wagyourtail.jsmacros.client.gui.screens.MacroScreen]> {}
              interface _KeyMacrosScreen$$static extends ClassLike {
                new(parent: net.minecraft.class_437): KeyMacrosScreen;
              }
              let KeyMacrosScreen: _KeyMacrosScreen$$static;
              interface _KeyMacrosScreen {
                method_16803(keyCode: int, scanCode: int, modifiers: int): boolean;
                method_25406(mouseX: double, a1: double, mouseY: int): boolean;
                method_25426(): void;
              }
              interface KeyMacrosScreen extends CombineTypes<[_KeyMacrosScreen, xyz.wagyourtail.jsmacros.client.gui.screens.MacroScreen]> {}
              interface _MacroScreen$$static extends ClassLike {
                new(parent: net.minecraft.class_437): MacroScreen;
              }
              let MacroScreen: _MacroScreen$$static;
              interface _MacroScreen {
                addMacro(macro: jsmacros.core.config.ScriptTrigger): void;
                confirmRemoveMacro(macro: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>): void;
                _createTopbar(): wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>;
                editFile(file: java.io.File): void;
                method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                method_25401(mouseX: double, a1: double, mouseY: double, a3: double): boolean;
                _method_25426(): void;
                method_25432(): void;
                _onScrollbar(page: double): void;
                removeMacro(macro: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>): void;
                runFile(): void;
                setEvent(macro: gui.containers.MacroContainer): void;
                setFile(macro: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>): void;
                setMacroPos(): void;
                updateSettings(): void;
                _aboutBtn: wagyourtail.wagyourgui.elements.Button;
                _eventScreen: wagyourtail.wagyourgui.elements.Button;
                _keyScreen: wagyourtail.wagyourgui.elements.Button;
                _macroScroll: wagyourtail.wagyourgui.elements.Scrollbar;
                _macros: java.util.List<wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>>;
                _runningBtn: wagyourtail.wagyourgui.elements.Button;
                _serviceScreen: wagyourtail.wagyourgui.elements.Button;
                _topScroll: int;
                _topbar: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>;
              }
              interface MacroScreen extends CombineTypes<[_MacroScreen, xyz.wagyourtail.wagyourgui.BaseScreen]> {}
              interface _ServiceScreen$$static extends ClassLike {
                new(parent: net.minecraft.class_437): ServiceScreen;
              }
              let ServiceScreen: _ServiceScreen$$static;
              interface _ServiceScreen {
                addService(service: string): void;
                _createTopbar(): wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>;
                method_25419(): void;
                _method_25426(): void;
                removeMacro(macro: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>): void;
                setFile(macro: wagyourtail.wagyourgui.containers.MultiElementContainer<MacroScreen>): void;
              }
              interface ServiceScreen extends CombineTypes<[_ServiceScreen, xyz.wagyourtail.jsmacros.client.gui.screens.MacroScreen]> {}
            }
            module settings {
              module settingcontainer {
                interface _AbstractMapSettingContainer$$static<T,U> extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): AbstractMapSettingContainer<T,U>;
                }
                let AbstractMapSettingContainer: _AbstractMapSettingContainer$$static<T,U>;
                interface _AbstractMapSettingContainer<T,U> {
                  addField(a0: string, a1: T): void;
(a0: string, a1: T): void;
                  addSetting(setting: SettingsOverlay$SettingField<any>): void;
                  changeKey(key: string, newKey: string): void;
                  changeValue(key: string, newValue: T): void;
                  init(): void;
                  newField(key: string): void;
                  onScrollbar(pages: double): void;
                  removeField(key: string): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  defaultValue: java.util.function.Supplier<T>;
                  readonly map: java.util.Map<string,U>;
                  setting: SettingsOverlay$SettingField<java.util.Map<string,T>>;
                  settingName: net.minecraft.class_5481;
                  topScroll: int;
                  totalHeight: int;
                }
                interface AbstractMapSettingContainer<T,U> extends CombineTypes<[_AbstractMapSettingContainer<T,U>, AbstractSettingContainer]> {}
                interface _AbstractMapSettingContainer$MapSettingEntry$$static<T> extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: AbstractMapSettingContainer<T,AbstractMapSettingContainer$MapSettingEntry<T>>, key: string, value: T): AbstractMapSettingContainer$MapSettingEntry<T>;
                }
                let AbstractMapSettingContainer$MapSettingEntry: _AbstractMapSettingContainer$MapSettingEntry$$static<T>;
                interface _AbstractMapSettingContainer$MapSettingEntry<T> {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setKey(newKey: string): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                  setValue(newValue: T): void;
                  _key: string;
                  _keyBtn: wagyourtail.wagyourgui.elements.Button;
                  _value: T;
                }
                interface AbstractMapSettingContainer$MapSettingEntry<T> extends CombineTypes<[_AbstractMapSettingContainer$MapSettingEntry<T>, wagyourtail.wagyourgui.containers.MultiElementContainer<AbstractMapSettingContainer<T,AbstractMapSettingContainer$MapSettingEntry<T>>>]> {}
                interface _AbstractSettingContainer$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): AbstractSettingContainer;
                }
                let AbstractSettingContainer: _AbstractSettingContainer$$static;
                interface _AbstractSettingContainer {
                  addSetting(a0: SettingsOverlay$SettingField<any>): void;
(a0: SettingsOverlay$SettingField<any>): void;
                  readonly group: string[];
                  scroll: wagyourtail.wagyourgui.elements.Scrollbar;
                }
                interface AbstractSettingContainer extends CombineTypes<[_AbstractSettingContainer, wagyourtail.wagyourgui.containers.MultiElementContainer<SettingsOverlay>]> {}
                interface _ColorMapSetting$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): ColorMapSetting;
                }
                let ColorMapSetting: _ColorMapSetting$$static;
                interface _ColorMapSetting {
                  addField(key: string, value: short[]): void;
                  addField(a0: string, a1: any): void;
                }
                interface ColorMapSetting extends CombineTypes<[_ColorMapSetting, AbstractMapSettingContainer<short[],ColorMapSetting$ColorEntry>]> {}
                interface _ColorMapSetting$ColorEntry$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: ColorMapSetting, key: string, value: short[]): ColorMapSetting$ColorEntry;
                }
                let ColorMapSetting$ColorEntry: _ColorMapSetting$ColorEntry$$static;
                interface _ColorMapSetting$ColorEntry {
                  convertColorToInt(color: short[]): int;
                  convertColorToString(color: short[]): string;
                  convertStringToColor(color: string): short[];
                  init(): void;
                }
                interface ColorMapSetting$ColorEntry extends CombineTypes<[_ColorMapSetting$ColorEntry, AbstractMapSettingContainer$MapSettingEntry<short[]>]> {}
                interface _FileMapSetting$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): FileMapSetting;
                }
                let FileMapSetting: _FileMapSetting$$static;
                interface _FileMapSetting {
                  addField(key: string, value: string): void;
                  addField(a0: string, a1: any): void;
                }
                interface FileMapSetting extends CombineTypes<[_FileMapSetting, AbstractMapSettingContainer<string,FileMapSetting$FileEntry>]> {}
                interface _FileMapSetting$FileEntry$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: FileMapSetting, key: string, value: string): FileMapSetting$FileEntry;
                }
                let FileMapSetting$FileEntry: _FileMapSetting$FileEntry$$static;
                interface _FileMapSetting$FileEntry {
                  init(): void;
                }
                interface FileMapSetting$FileEntry extends CombineTypes<[_FileMapSetting$FileEntry, AbstractMapSettingContainer$MapSettingEntry<string>]> {}
                interface _PrimitiveSettingGroup$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): PrimitiveSettingGroup;
                }
                let PrimitiveSettingGroup: _PrimitiveSettingGroup$$static;
                interface _PrimitiveSettingGroup {
                  addSetting(setting: SettingsOverlay$SettingField<any>): void;
                  init(): void;
                  onScrollbar(page: double): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  _settingHeight: int;
                  _settings: java.util.List<settings.settingfields.AbstractSettingField<any>>;
                  _topScroll: int;
                }
                interface PrimitiveSettingGroup extends CombineTypes<[_PrimitiveSettingGroup, xyz.wagyourtail.jsmacros.client.gui.settings.settingcontainer.AbstractSettingContainer]> {}
                interface _ProfileSetting$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): ProfileSetting;
                }
                let ProfileSetting: _ProfileSetting$$static;
                interface _ProfileSetting {
                  addField(key: string, value: java.util.List<jsmacros.core.config.ScriptTrigger>): void;
                  addField(a0: string, a1: any): void;
                  changeKey(key: string, newKey: string): void;
                  removeField(key: string): void;
                }
                interface ProfileSetting extends CombineTypes<[_ProfileSetting, AbstractMapSettingContainer<java.util.List<jsmacros.core.config.ScriptTrigger>,ProfileSetting$ProfileEntry>]> {}
                interface _ProfileSetting$ProfileEntry$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: ProfileSetting, key: string, value: java.util.List<jsmacros.core.config.ScriptTrigger>): ProfileSetting$ProfileEntry;
                }
                let ProfileSetting$ProfileEntry: _ProfileSetting$ProfileEntry$$static;
                interface _ProfileSetting$ProfileEntry {
                  init(): void;
                }
                interface ProfileSetting$ProfileEntry extends CombineTypes<[_ProfileSetting$ProfileEntry, AbstractMapSettingContainer$MapSettingEntry<java.util.List<jsmacros.core.config.ScriptTrigger>>]> {}
                interface _StringMapSetting$$static extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: SettingsOverlay, group: string[]): StringMapSetting;
                }
                let StringMapSetting: _StringMapSetting$$static;
                interface _StringMapSetting {
                  addField(key: string, value: string): void;
                  addField(a0: string, a1: any): void;
                }
                interface StringMapSetting extends CombineTypes<[_StringMapSetting, AbstractMapSettingContainer<string,StringMapSetting$StringEntry>]> {}
                interface _StringMapSetting$StringEntry$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: StringMapSetting, key: string, value: string): StringMapSetting$StringEntry;
                }
                let StringMapSetting$StringEntry: _StringMapSetting$StringEntry$$static;
                interface _StringMapSetting$StringEntry {
                  init(): void;
                }
                interface StringMapSetting$StringEntry extends CombineTypes<[_StringMapSetting$StringEntry, AbstractMapSettingContainer$MapSettingEntry<string>]> {}
              }
              module settingfields {
                interface _AbstractSettingField$$static<T> extends ClassLike {
                  new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<T>): AbstractSettingField<T>;
                }
                let AbstractSettingField: _AbstractSettingField$$static<T>;
                interface _AbstractSettingField<T> {
                  _setting: SettingsOverlay$SettingField<T>;
                  _settingName: net.minecraft.class_2561;
                }
                interface AbstractSettingField<T> extends CombineTypes<[_AbstractSettingField<T>, wagyourtail.wagyourgui.containers.MultiElementContainer<settings.settingcontainer.AbstractSettingContainer>]> {}
                interface _BooleanField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<boolean>): BooleanField;
                }
                let BooleanField: _BooleanField$$static;
                interface _BooleanField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface BooleanField extends CombineTypes<[_BooleanField, AbstractSettingField<boolean>]> {}
                interface _DoubleField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<double>): DoubleField;
                }
                let DoubleField: _DoubleField$$static;
                interface _DoubleField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface DoubleField extends CombineTypes<[_DoubleField, AbstractSettingField<double>]> {}
                interface _FileField$$static extends ClassLike {
                  getTopLevel(setting: SettingsOverlay$SettingField<any>): java.io.File;
                  relativize(setting: SettingsOverlay$SettingField<any>, file: java.io.File): string;
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<string>): FileField;
                }
                let FileField: _FileField$$static;
                interface _FileField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface FileField extends CombineTypes<[_FileField, AbstractSettingField<string>]> {}
                interface _FloatField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<float>): FloatField;
                }
                let FloatField: _FloatField$$static;
                interface _FloatField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface FloatField extends CombineTypes<[_FloatField, AbstractSettingField<float>]> {}
                interface _IntField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<int>): IntField;
                }
                let IntField: _IntField$$static;
                interface _IntField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface IntField extends CombineTypes<[_IntField, AbstractSettingField<int>]> {}
                interface _LongField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<long>): LongField;
                }
                let LongField: _LongField$$static;
                interface _LongField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface LongField extends CombineTypes<[_LongField, AbstractSettingField<long>]> {}
                interface _OptionsField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<any>): OptionsField;
                }
                let OptionsField: _OptionsField$$static;
                interface _OptionsField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface OptionsField extends CombineTypes<[_OptionsField, AbstractSettingField<any>]> {}
                interface _StringField$$static extends ClassLike {
                  new(x: int, y: int, width: int, textRenderer: net.minecraft.class_327, parent: settings.settingcontainer.AbstractSettingContainer, field: SettingsOverlay$SettingField<string>): StringField;
                }
                let StringField: _StringField$$static;
                interface _StringField {
                  init(): void;
                  render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  setPos(x: int, y: int, width: int, height: int): void;
                }
                interface StringField extends CombineTypes<[_StringField, AbstractSettingField<string>]> {}
              }
              interface _CategoryTreeContainer$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: ICategoryTreeParent): CategoryTreeContainer;
              }
              let CategoryTreeContainer: _CategoryTreeContainer$$static;
              interface _CategoryTreeContainer {
                addCategory(category: string[]): CategoryTreeContainer;
                addCategory(...category: string[]): CategoryTreeContainer;
                _getHead(): CategoryTreeContainer;
                init(): void;
                _initChild(show: boolean): void;
                onScrollbar(page: double): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                selectCategory(category: string[]): void;
                selectCategory(...category: string[]): void;
                _toggleExpand(): void;
                updateOffsets(): void;
                _updateOffsets(y: int, minShow: int, maxShow: int, parentShowChildren: boolean): int;
                btnHeight: int;
                readonly category: string;
                children: java.util.Map<string,CategoryTreeContainer>;
                expandBtn: wagyourtail.wagyourgui.elements.Button;
                isHead: boolean;
                scroll: wagyourtail.wagyourgui.elements.Scrollbar;
                showBtn: wagyourtail.wagyourgui.elements.Button;
                _showChildren: boolean;
                topScroll: int;
              }
              interface CategoryTreeContainer extends CombineTypes<[_CategoryTreeContainer, wagyourtail.wagyourgui.containers.MultiElementContainer<ICategoryTreeParent>, ICategoryTreeParent]> {}
              interface _ICategoryTreeParent$$static extends ClassLike {
              }
              let ICategoryTreeParent: _ICategoryTreeParent$$static;
              interface _ICategoryTreeParent {
                selectCategory(a0: string[]): void;
(a0: string[]): void;
              }
              interface ICategoryTreeParent extends CombineTypes<[_ICategoryTreeParent, xyz.wagyourtail.wagyourgui.containers.IContainerParent, java.lang.Object]> {}
              interface _SettingsOverlay$$static extends ClassLike {
                new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: wagyourtail.wagyourgui.overlays.IOverlayParent): SettingsOverlay;
              }
              let SettingsOverlay: _SettingsOverlay$$static;
              interface _SettingsOverlay {
                clearCategory(): void;
                init(): void;
                keyPressed(keyCode: int, scanCode: int, modifiers: int): boolean;
                onClose(): void;
                render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                selectCategory(category: string[]): void;
                _category: settingcontainer.AbstractSettingContainer;
                _sections: CategoryTreeContainer;
                _settings: SettingsOverlay$SettingTree;
                _title: net.minecraft.class_2561;
              }
              interface SettingsOverlay extends CombineTypes<[_SettingsOverlay, xyz.wagyourtail.jsmacros.client.gui.settings.ICategoryTreeParent, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
              interface _SettingsOverlay$SettingField$$static<T> extends ClassLike {
                new(option: jsmacros.core.config.Option, containingClass: any, f: java.lang.reflect.Field, getter: java.lang.reflect.Method, setter: java.lang.reflect.Method, type: java.lang.Class<T>): SettingsOverlay$SettingField<T>;
              }
              let SettingsOverlay$SettingField: _SettingsOverlay$SettingField$$static<T>;
              interface _SettingsOverlay$SettingField<T> {
                get(): T;
                getOptions(): java.util.List<T>;
                hasOptions(): boolean;
                isSimple(): boolean;
                set(o: T): void;
                _containingClass: any;
                _field: java.lang.reflect.Field;
                _getter: java.lang.reflect.Method;
                readonly option: jsmacros.core.config.Option;
                _setter: java.lang.reflect.Method;
                readonly type: java.lang.Class<T>;
              }
              interface SettingsOverlay$SettingField<T> extends CombineTypes<[_SettingsOverlay$SettingField<T>, java.lang.Object]> {}
              interface _SettingsOverlay$SettingTree$$static extends ClassLike {
                _new(): SettingsOverlay$SettingTree;
              }
              let SettingsOverlay$SettingTree: _SettingsOverlay$SettingTree$$static;
              interface _SettingsOverlay$SettingTree {
                _addChild(group: string[], field: SettingsOverlay$SettingField<any>): void;
                getSettings(group: string[]): java.util.List<SettingsOverlay$SettingField<any>>;
                groups(): java.util.List<string[]>;
                _children: java.util.Map<string,SettingsOverlay$SettingTree>;
                _settings: java.util.List<SettingsOverlay$SettingField<any>>;
              }
              interface SettingsOverlay$SettingTree extends CombineTypes<[_SettingsOverlay$SettingTree, java.lang.Object]> {}
            }
          }
          module listeners {
            interface _KeyListener$$static extends ClassLike {
              new(macro: jsmacros.core.config.ScriptTrigger, runner: jsmacros.core.Core): KeyListener;
            }
            let KeyListener: _KeyListener$$static;
            interface _KeyListener {
              _check(event: client.api.event.impl.EventKey): boolean;
              trigger(event: jsmacros.core.event.BaseEvent): jsmacros.core.language.EventContainer<any>;
              _key: string;
              _mods: int;
            }
            interface KeyListener extends CombineTypes<[_KeyListener, xyz.wagyourtail.jsmacros.core.event.BaseListener]> {}
          }
          module mixin {
            module access {
              interface _MixinAbstractFurnaceScreenHandler$$static extends ClassLike {
              }
              let MixinAbstractFurnaceScreenHandler: _MixinAbstractFurnaceScreenHandler$$static;
              interface _MixinAbstractFurnaceScreenHandler {
                getPropertyDelegate(): net.minecraft.class_3913;
                invokeIsFuel(a0: net.minecraft.class_1799): boolean;
                invokeIsSmeltable(a0: net.minecraft.class_1799): boolean;
              }
              interface MixinAbstractFurnaceScreenHandler extends CombineTypes<[_MixinAbstractFurnaceScreenHandler, java.lang.Object]> {}
              interface _MixinAbstractHorseEntity$$static extends ClassLike {
              }
              let MixinAbstractHorseEntity: _MixinAbstractHorseEntity$$static;
              interface _MixinAbstractHorseEntity {
                invokeGetInventorySize(): int;
(): int;
              }
              interface MixinAbstractHorseEntity extends CombineTypes<[_MixinAbstractHorseEntity, java.lang.Object]> {}
              interface _MixinAbstractPiglinEntity$$static extends ClassLike {
              }
              let MixinAbstractPiglinEntity: _MixinAbstractPiglinEntity$$static;
              interface _MixinAbstractPiglinEntity {
                invokeIsImmuneToZombification(): boolean;
(): boolean;
              }
              interface MixinAbstractPiglinEntity extends CombineTypes<[_MixinAbstractPiglinEntity, java.lang.Object]> {}
              interface _MixinAdvancementManager$$static extends ClassLike {
              }
              let MixinAdvancementManager: _MixinAdvancementManager$$static;
              interface _MixinAdvancementManager {
                getAdvancements(): java.util.Map<net.minecraft.class_2960,net.minecraft.class_8781>;
                getDependents(): java.util.Set<net.minecraft.class_8781>;
              }
              interface MixinAdvancementManager extends CombineTypes<[_MixinAdvancementManager, java.lang.Object]> {}
              interface _MixinAdvancementProgress$$static extends ClassLike {
              }
              let MixinAdvancementProgress: _MixinAdvancementProgress$$static;
              interface _MixinAdvancementProgress {
                getCriteriaProgresses(): java.util.Map<string,net.minecraft.class_178>;
                getRequirements(): net.minecraft.class_8782;
                invokeCountObtainedRequirements(): int;
              }
              interface MixinAdvancementProgress extends CombineTypes<[_MixinAdvancementProgress, java.lang.Object]> {}
              interface _MixinAllayEntity$$static extends ClassLike {
              }
              let MixinAllayEntity: _MixinAllayEntity$$static;
              interface _MixinAllayEntity {
                invokeCanDuplicate(): boolean;
(): boolean;
              }
              interface MixinAllayEntity extends CombineTypes<[_MixinAllayEntity, java.lang.Object]> {}
              interface _MixinAnvilScreen$$static extends ClassLike {
              }
              let MixinAnvilScreen: _MixinAnvilScreen$$static;
              interface _MixinAnvilScreen {
                getNameField(): net.minecraft.class_342;
(): net.minecraft.class_342;
              }
              interface MixinAnvilScreen extends CombineTypes<[_MixinAnvilScreen, java.lang.Object]> {}
              interface _MixinBlockPredicatesChecker$$static extends ClassLike {
              }
              let MixinBlockPredicatesChecker: _MixinBlockPredicatesChecker$$static;
              interface _MixinBlockPredicatesChecker {
                getPredicates(): java.util.List<net.minecraft.class_4550>;
(): java.util.List<net.minecraft.class_4550>;
              }
              interface MixinBlockPredicatesChecker extends CombineTypes<[_MixinBlockPredicatesChecker, java.lang.Object]> {}
              interface _MixinChatHud$$static extends ClassLike {
                new(): MixinChatHud;
              }
              let MixinChatHud: _MixinChatHud$$static;
              interface _MixinChatHud {
                jsmacros_addMessageAtIndexBypass(message: net.minecraft.class_2561, index: int, time: int): void;
                jsmacros_addMessageBypass(message: net.minecraft.class_2561): void;
                _method_44811(message: net.minecraft.class_2561, signature: net.minecraft.class_7469, indicator: net.minecraft.class_7591): void;
                overrideMessagePos(pos: int): int;
                _field_2061: java.util.List<net.minecraft.class_303>;
                _jsmacros$positionOverride: java.lang.ThreadLocal<int>;
              }
              interface MixinChatHud extends CombineTypes<[_MixinChatHud, xyz.wagyourtail.jsmacros.client.access.IChatHud, java.lang.Object]> {}
              interface _MixinChunkSelection$$static extends ClassLike {
                new(): MixinChunkSelection;
              }
              let MixinChunkSelection: _MixinChunkSelection$$static;
              interface _MixinChunkSelection {
                jsmacros_getNonEmptyBlockCount(): short;
                jsmacros_getNonEmptyFluidCount(): short;
                jsmacros_getRandomTickableBlockCount(): short;
                _field_12877: short;
                _field_12881: short;
                _field_12882: short;
              }
              interface MixinChunkSelection extends CombineTypes<[_MixinChunkSelection, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.IChunkSection]> {}
              interface _MixinClientAdvancementManager$$static extends ClassLike {
              }
              let MixinClientAdvancementManager: _MixinClientAdvancementManager$$static;
              interface _MixinClientAdvancementManager {
                getAdvancementProgresses(): java.util.Map<net.minecraft.class_8779,net.minecraft.class_167>;
(): java.util.Map<net.minecraft.class_8779,net.minecraft.class_167>;
              }
              interface MixinClientAdvancementManager extends CombineTypes<[_MixinClientAdvancementManager, java.lang.Object]> {}
              interface _MixinClientPlayNetworkHandler$$static extends ClassLike {
                new(): MixinClientPlayNetworkHandler;
              }
              let MixinClientPlayNetworkHandler: _MixinClientPlayNetworkHandler$$static;
              interface _MixinClientPlayNetworkHandler {
                onGameJoin(packet: net.minecraft.class_2678, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onServerTime(packet: net.minecraft.class_2761, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _jsmacros$lastServerTimeRecvTick: long;
                _jsmacros$lastServerTimeRecvTime: long;
                _jsmacros$timeSync: any;
                _jsmacros$tpsData15M: java.util.List<client.tick.TPSData>;
                _jsmacros$tpsData1M: java.util.List<client.tick.TPSData>;
                _jsmacros$tpsData5M: java.util.List<client.tick.TPSData>;
              }
              interface MixinClientPlayNetworkHandler extends CombineTypes<[_MixinClientPlayNetworkHandler, java.lang.Object]> {}
              interface _MixinClientPlayerInteractionManager$$static extends ClassLike {
                _new(): MixinClientPlayerInteractionManager;
              }
              let MixinClientPlayerInteractionManager: _MixinClientPlayerInteractionManager$$static;
              interface _MixinClientPlayerInteractionManager {
                breakingBlock(pos: net.minecraft.class_2338, direction: net.minecraft.class_2350, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                jsmacros_getBlockBreakingCooldown(): int;
                onBreakBlock(pos: net.minecraft.class_2338, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                _field_3712: net.minecraft.class_310;
                _field_3716: int;
              }
              interface MixinClientPlayerInteractionManager extends CombineTypes<[_MixinClientPlayerInteractionManager, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.IClientPlayerInteractionManager]> {}
              interface _MixinCreativeInventoryScreen$$static extends ClassLike {
              }
              let MixinCreativeInventoryScreen: _MixinCreativeInventoryScreen$$static;
              interface _MixinCreativeInventoryScreen {
                getScrollPosition(): float;
                getSearchBox(): net.minecraft.class_342;
                getSelectedTab(): net.minecraft.class_1761;
                invokeHasScrollbar(): boolean;
                invokeSearch(): void;
                invokeSetSelectedTab(a0: net.minecraft.class_1761): void;
              }
              interface MixinCreativeInventoryScreen extends CombineTypes<[_MixinCreativeInventoryScreen, java.lang.Object]> {}
              interface _MixinCreeperEntity$$static extends ClassLike {
              }
              let MixinCreeperEntity: _MixinCreeperEntity$$static;
              interface _MixinCreeperEntity {
                getFuseTime(): int;
                getMaxFuseTime(): int;
              }
              interface MixinCreeperEntity extends CombineTypes<[_MixinCreeperEntity, java.lang.Object]> {}
              interface _MixinCyclingButton$$static<T> extends ClassLike {
              }
              let MixinCyclingButton: _MixinCyclingButton$$static<T>;
              interface _MixinCyclingButton<T> {
                getValueToText(): java.util.function.Function<T,net.minecraft.class_2561>;
                invokeComposeText(a0: T): net.minecraft.class_2561;
                invokeCycle(a0: int): void;
              }
              interface MixinCyclingButton<T> extends CombineTypes<[_MixinCyclingButton<T>, java.lang.Object]> {}
              interface _MixinDisconnectedScreen$$static extends ClassLike {
              }
              let MixinDisconnectedScreen: _MixinDisconnectedScreen$$static;
              interface _MixinDisconnectedScreen {
                getInfo(): net.minecraft.class_9812;
(): net.minecraft.class_9812;
              }
              interface MixinDisconnectedScreen extends CombineTypes<[_MixinDisconnectedScreen, java.lang.Object]> {}
              interface _MixinDisplayEntity$$static extends ClassLike {
              }
              let MixinDisplayEntity: _MixinDisplayEntity$$static;
              interface _MixinDisplayEntity {
                callGetBillboardMode(): net.minecraft.class_8113$class_8114;
                callGetBrightnessUnpacked(): net.minecraft.class_8104;
                callGetDisplayHeight(): float;
                callGetDisplayWidth(): float;
                callGetGlowColorOverride(): int;
                callGetShadowRadius(): float;
                callGetShadowStrength(): float;
                callGetViewRange(): float;
              }
              interface MixinDisplayEntity extends CombineTypes<[_MixinDisplayEntity, java.lang.Object]> {}
              interface _MixinEntity$$static extends ClassLike {
                new(): MixinEntity;
              }
              let MixinEntity: _MixinEntity$$static;
              interface _MixinEntity {
                getTeamColorValue(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<int>): void;
                isGlowing(cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                jsmacros_resetColor(): void;
                jsmacros_setForceGlowing(glowing: int): void;
                jsmacros_setGlowingColor(glowingColor: int): void;
                _jsmacros$forceGlowing: int;
                _jsmacros$glowingColor: int;
              }
              interface MixinEntity extends CombineTypes<[_MixinEntity, xyz.wagyourtail.jsmacros.client.access.IMixinEntity, java.lang.Object]> {}
              interface _MixinEntity2$$static extends ClassLike {
              }
              let MixinEntity2: _MixinEntity2$$static;
              interface _MixinEntity2 {
                getCustomNameKey(): net.minecraft.class_2940<java.util.Optional<net.minecraft.class_2561>>;
(): net.minecraft.class_2940<java.util.Optional<net.minecraft.class_2561>>;
              }
              interface MixinEntity2 extends CombineTypes<[_MixinEntity2, java.lang.Object]> {}
              interface _MixinFishingBobberEntity$$static extends ClassLike {
              }
              let MixinFishingBobberEntity: _MixinFishingBobberEntity$$static;
              interface _MixinFishingBobberEntity {
                getCaughtFish(): boolean;
(): boolean;
              }
              interface MixinFishingBobberEntity extends CombineTypes<[_MixinFishingBobberEntity, java.lang.Object]> {}
              interface _MixinFontManager$$static extends ClassLike {
                new(): MixinFontManager;
              }
              let MixinFontManager: _MixinFontManager$$static;
              interface _MixinFontManager {
                jsmacros_getFontList(): java.util.Set<net.minecraft.class_2960>;
                _field_2259: java.util.Map<net.minecraft.class_2960,net.minecraft.class_377>;
              }
              interface MixinFontManager extends CombineTypes<[_MixinFontManager, xyz.wagyourtail.jsmacros.client.access.IFontManager, java.lang.Object]> {}
              interface _MixinFoxEntity$$static extends ClassLike {
              }
              let MixinFoxEntity: _MixinFoxEntity$$static;
              interface _MixinFoxEntity {
                invokeCanTrust(a0: net.minecraft.class_1309): boolean;
                invokeGetTrustedEntities(): java.util.stream.Stream<net.minecraft.class_10583<net.minecraft.class_1309>>;
                invokeIsAggressive(): boolean;
              }
              interface MixinFoxEntity extends CombineTypes<[_MixinFoxEntity, java.lang.Object]> {}
              interface _MixinHandledScreen$$static<T> extends ClassLike {
                _new(title: net.minecraft.class_2561): MixinHandledScreen<T>;
              }
              let MixinHandledScreen: _MixinHandledScreen$$static<T>;
              interface _MixinHandledScreen<T> {
                jsmacros_getSlotUnder(x: double, a1: double): net.minecraft.class_1735;
                _method_64240(x: double, a1: double): net.minecraft.class_1735;
                _onDrawSlot(context: net.minecraft.class_332, slot: net.minecraft.class_1735, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_2776: int;
                _field_2797: T;
                _field_2800: int;
              }
              interface MixinHandledScreen<T> extends CombineTypes<[_MixinHandledScreen<T>, client.access.IInventory, net.minecraft.class_437]> {}
              interface _MixinHorseEntity$$static extends ClassLike {
              }
              let MixinHorseEntity: _MixinHorseEntity$$static;
              interface _MixinHorseEntity {
                invokeGetHorseVariant(): int;
(): int;
              }
              interface MixinHorseEntity extends CombineTypes<[_MixinHorseEntity, java.lang.Object]> {}
              interface _MixinHorseScreen$$static extends ClassLike {
                new(): MixinHorseScreen;
              }
              let MixinHorseScreen: _MixinHorseScreen$$static;
              interface _MixinHorseScreen {
                jsmacros_getEntity(): net.minecraft.class_1297;
                _field_2941: net.minecraft.class_1496;
              }
              interface MixinHorseScreen extends CombineTypes<[_MixinHorseScreen, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.IHorseScreen]> {}
              interface _MixinInGameHud$$static extends ClassLike {
                new(): MixinInGameHud;
              }
              let MixinInGameHud: _MixinInGameHud$$static;
              interface _MixinInGameHud {
                _onRenderHud(context: net.minecraft.class_332, tickCounter: net.minecraft.class_9779, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
              }
              interface MixinInGameHud extends CombineTypes<[_MixinInGameHud, java.lang.Object]> {}
              interface _MixinInteractionEntity$$static extends ClassLike {
                new(): MixinInteractionEntity;
              }
              let MixinInteractionEntity: _MixinInteractionEntity$$static;
              interface _MixinInteractionEntity {
                jsmacros_setCanHitOverride(value: boolean): void;
                overrideCanHit(cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                _jsmacros$canHitOverride: boolean;
              }
              interface MixinInteractionEntity extends CombineTypes<[_MixinInteractionEntity, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.IMixinInteractionEntity]> {}
              interface _MixinInteractionEntity2$$static extends ClassLike {
              }
              let MixinInteractionEntity2: _MixinInteractionEntity2$$static;
              interface _MixinInteractionEntity2 {
                callGetInteractionHeight(): float;
                callGetInteractionWidth(): float;
                callShouldRespond(): boolean;
              }
              interface MixinInteractionEntity2 extends CombineTypes<[_MixinInteractionEntity2, java.lang.Object]> {}
              interface _MixinItemCooldownEntry$$static extends ClassLike {
                new(): MixinItemCooldownEntry;
              }
              let MixinItemCooldownEntry: _MixinItemCooldownEntry$$static;
              interface _MixinItemCooldownEntry {
                jsmacros_getEndTick(): int;
                jsmacros_getStartTick(): int;
                _comp_3083: int;
                _comp_3084: int;
              }
              interface MixinItemCooldownEntry extends CombineTypes<[_MixinItemCooldownEntry, xyz.wagyourtail.jsmacros.client.access.IItemCooldownEntry, java.lang.Object]> {}
              interface _MixinItemCooldownManager$$static extends ClassLike {
                new(): MixinItemCooldownManager;
              }
              let MixinItemCooldownManager: _MixinItemCooldownManager$$static;
              interface _MixinItemCooldownManager {
                jsmacros_getCooldownItems(): java.util.Map<net.minecraft.class_1792,client.access.IItemCooldownEntry>;
                jsmacros_getManagerTicks(): int;
                _field_8024: java.util.Map<net.minecraft.class_1792,client.access.IItemCooldownEntry>;
                _field_8025: int;
              }
              interface MixinItemCooldownManager extends CombineTypes<[_MixinItemCooldownManager, xyz.wagyourtail.jsmacros.client.access.IItemCooldownManager, java.lang.Object]> {}
              interface _MixinLoomScreen$$static extends ClassLike {
                new(): MixinLoomScreen;
              }
              let MixinLoomScreen: _MixinLoomScreen$$static;
              interface _MixinLoomScreen {
                jsmacros_canApplyDyePattern(): boolean;
                _field_2965: boolean;
              }
              interface MixinLoomScreen extends CombineTypes<[_MixinLoomScreen, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.ILoomScreen]> {}
              interface _MixinMerchantEntity$$static extends ClassLike {
                new(): MixinMerchantEntity;
              }
              let MixinMerchantEntity: _MixinMerchantEntity$$static;
              interface _MixinMerchantEntity {
                jsmacros_refreshOffers(): void;
                _field_17721: net.minecraft.class_1916;
              }
              interface MixinMerchantEntity extends CombineTypes<[_MixinMerchantEntity, xyz.wagyourtail.jsmacros.client.access.IMerchantEntity, java.lang.Object]> {}
              interface _MixinMerchantScreen$$static extends ClassLike {
                new(): MixinMerchantScreen;
              }
              let MixinMerchantScreen: _MixinMerchantScreen$$static;
              interface _MixinMerchantScreen {
                jsmacros_selectIndex(index: int): void;
                _method_2496(): void;
(): void;
                _field_19161: int;
              }
              interface MixinMerchantScreen extends CombineTypes<[_MixinMerchantScreen, xyz.wagyourtail.jsmacros.client.access.IMerchantScreen, java.lang.Object]> {}
              interface _MixinMinecraftClient$$static extends ClassLike {
                _new(): MixinMinecraftClient;
              }
              let MixinMinecraftClient: _MixinMinecraftClient$$static;
              interface _MixinMinecraftClient {
                _blockAttackBlock(cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                _continueInteracting(im: net.minecraft.class_636, player: net.minecraft.class_1657): void;
                _ensureInteracting(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _ensureOverrideInteractions(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _method_1590(a0: boolean): void;
(a0: boolean): void;
                onCloseScreen(screen: net.minecraft.class_437, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onDisconnect(disconnectionScreen: net.minecraft.class_437, transferring: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onJoinWorld(world: net.minecraft.class_638, worldEntryReason: net.minecraft.class_434$class_9678, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onResolutionChanged(info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _overrideBlockBreaking(breaking: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                field_1687: net.minecraft.class_638;
                field_1690: net.minecraft.class_315;
                _field_1734: boolean;
                _field_1752: int;
                field_1755: net.minecraft.class_437;
                _field_1771: int;
                _field_18175: net.minecraft.class_4071;
              }
              interface MixinMinecraftClient extends CombineTypes<[_MixinMinecraftClient, java.lang.Object]> {}
              interface _MixinOcelotEntity$$static extends ClassLike {
              }
              let MixinOcelotEntity: _MixinOcelotEntity$$static;
              interface _MixinOcelotEntity {
                invokeIsTrusting(): boolean;
(): boolean;
              }
              interface MixinOcelotEntity extends CombineTypes<[_MixinOcelotEntity, java.lang.Object]> {}
              interface _MixinPackedIntegerArray$$static extends ClassLike {
                new(): MixinPackedIntegerArray;
              }
              let MixinPackedIntegerArray: _MixinPackedIntegerArray$$static;
              interface _MixinPackedIntegerArray {
                jsmacros_getElementsPerLong(): int;
                jsmacros_getIndexOffset(): int;
                jsmacros_getIndexScale(): int;
                jsmacros_getIndexShift(): int;
                jsmacros_getMaxValue(): long;
                _field_15634: long;
                _field_24079: int;
                _field_24080: int;
                _field_24081: int;
                _field_24082: int;
              }
              interface MixinPackedIntegerArray extends CombineTypes<[_MixinPackedIntegerArray, xyz.wagyourtail.jsmacros.client.access.IPackedIntegerArray, java.lang.Object]> {}
              interface _MixinPalettedContainer$$static<T> extends ClassLike {
                new(): MixinPalettedContainer<T>;
              }
              let MixinPalettedContainer: _MixinPalettedContainer$$static<T>;
              interface _MixinPalettedContainer<T> {
                jsmacros_getData(): client.access.IPalettedContainerData<T>;
                _dataField: java.lang.reflect.Field;
              }
              interface MixinPalettedContainer<T> extends CombineTypes<[_MixinPalettedContainer<T>, java.lang.Object, client.access.IPalettedContainer<T>]> {}
              interface _MixinPalettedContainerData$$static<T> extends ClassLike {
                new(): MixinPalettedContainerData<T>;
              }
              let MixinPalettedContainerData: _MixinPalettedContainerData$$static<T>;
              interface _MixinPalettedContainerData<T> {
                jsmacros_getPalette(): net.minecraft.class_2837<T>;
                jsmacros_getStorage(): net.minecraft.class_6490;
                _comp_118: net.minecraft.class_6490;
                _comp_119: net.minecraft.class_2837<T>;
              }
              interface MixinPalettedContainerData<T> extends CombineTypes<[_MixinPalettedContainerData<T>, client.access.IPalettedContainerData<T>, java.lang.Object]> {}
              interface _MixinPhaseType$$static extends ClassLike {
              }
              let MixinPhaseType: _MixinPhaseType$$static;
              interface _MixinPhaseType {
                getName(): string;
(): string;
              }
              interface MixinPhaseType extends CombineTypes<[_MixinPhaseType, java.lang.Object]> {}
              interface _MixinPlayerEntity$$static extends ClassLike {
                _new(entityType: net.minecraft.class_1299<net.minecraft.class_1309>, world: net.minecraft.class_1937): MixinPlayerEntity;
              }
              let MixinPlayerEntity: _MixinPlayerEntity$$static;
              interface _MixinPlayerEntity {
                _getName(cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<net.minecraft.class_2561>): void;
                method_5665(name: net.minecraft.class_2561): void;
                _realCustomName: net.minecraft.class_2561;
              }
              interface MixinPlayerEntity extends CombineTypes<[_MixinPlayerEntity, net.minecraft.class_1309]> {}
              interface _MixinPlayerListHud$$static extends ClassLike {
                new(): MixinPlayerListHud;
              }
              let MixinPlayerListHud: _MixinPlayerListHud$$static;
              interface _MixinPlayerListHud {
                jsmacros_getFooter(): net.minecraft.class_2561;
                jsmacros_getHeader(): net.minecraft.class_2561;
                _field_2153: net.minecraft.class_2561;
                _field_2154: net.minecraft.class_2561;
              }
              interface MixinPlayerListHud extends CombineTypes<[_MixinPlayerListHud, xyz.wagyourtail.jsmacros.client.access.IPlayerListHud, java.lang.Object]> {}
              interface _MixinRecipeBookResults$$static extends ClassLike {
                new(): MixinRecipeBookResults;
              }
              let MixinRecipeBookResults: _MixinRecipeBookResults$$static;
              interface _MixinRecipeBookResults {
                jsmacros_getResultCollections(): java.util.List<net.minecraft.class_516>;
                _field_3127: java.util.List<net.minecraft.class_516>;
              }
              interface MixinRecipeBookResults extends CombineTypes<[_MixinRecipeBookResults, xyz.wagyourtail.jsmacros.client.access.IRecipeBookResults, java.lang.Object]> {}
              interface _MixinRecipeBookWidget$$static extends ClassLike {
                new(): MixinRecipeBookWidget;
              }
              let MixinRecipeBookWidget: _MixinRecipeBookWidget$$static;
              interface _MixinRecipeBookWidget {
                jsmacros_getRecipeBook(): net.minecraft.class_299;
                jsmacros_getResults(): net.minecraft.class_513;
                jsmacros_isSearching(): boolean;
                _field_3086: net.minecraft.class_513;
                _field_3087: boolean;
                _field_3096: net.minecraft.class_299;
              }
              interface MixinRecipeBookWidget extends CombineTypes<[_MixinRecipeBookWidget, xyz.wagyourtail.jsmacros.client.access.IRecipeBookWidget, java.lang.Object]> {}
              interface _MixinResourcePackManager$$static extends ClassLike {
                new(): MixinResourcePackManager;
              }
              let MixinResourcePackManager: _MixinResourcePackManager$$static;
              interface _MixinResourcePackManager {
                jsmacros_disableServerPacks(disable: boolean): void;
                jsmacros_isServerPacksDisabled(): boolean;
                onBuildPackList(instance: net.minecraft.class_3288): boolean;
                _disableServerPacks: boolean;
              }
              interface MixinResourcePackManager extends CombineTypes<[_MixinResourcePackManager, java.lang.Object, xyz.wagyourtail.jsmacros.client.access.IResourcePackManager]> {}
              interface _MixinScreen$$static extends ClassLike {
                new(): MixinScreen;
              }
              let MixinScreen: _MixinScreen$$static;
              interface _MixinScreen {
                addButton(x: int, y: int, width: int, height: int, text: string, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.ClickableWidgetHelper<any,any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.ClickableWidgetHelper<any,any>;
                addButton(x: int, y: int, width: int, height: int, zIndex: int, text: string, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.ClickableWidgetHelper<any,any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.ClickableWidgetHelper<any,any>;
                addCheckbox(x: int, y: int, width: int, height: int, text: string, checked: boolean, showMessage: boolean, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CheckBoxWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CheckBoxWidgetHelper;
                addCheckbox(x: int, y: int, width: int, height: int, text: string, checked: boolean, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CheckBoxWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CheckBoxWidgetHelper;
                addCheckbox(x: int, y: int, width: int, height: int, zIndex: int, text: string, checked: boolean, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CheckBoxWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CheckBoxWidgetHelper;
                addCheckbox(x: int, y: int, width: int, height: int, zIndex: int, text: string, checked: boolean, showMessage: boolean, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CheckBoxWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CheckBoxWidgetHelper;
                addCyclingButton(x: int, y: int, width: int, height: int, values: string[], initial: string, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CyclingButtonWidgetHelper<any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CyclingButtonWidgetHelper<any>;
                addCyclingButton(x: int, y: int, width: int, height: int, zIndex: int, values: string[], initial: string, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CyclingButtonWidgetHelper<any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CyclingButtonWidgetHelper<any>;
                addCyclingButton(x: int, y: int, width: int, height: int, zIndex: int, values: string[], alternatives: string[], initial: string, prefix: string, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CyclingButtonWidgetHelper<any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CyclingButtonWidgetHelper<any>;
                addCyclingButton(x: int, y: int, width: int, height: int, zIndex: int, values: string[], alternatives: string[], initial: string, prefix: string, alternateToggle: jsmacros.core.MethodWrapper<any,any,boolean,any>, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.CyclingButtonWidgetHelper<any>,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.CyclingButtonWidgetHelper<any>;
                addDraw2D(draw2D: client.api.classes.render.Draw2D, x: int, y: int, width: int, height: int): client.api.classes.render.components.Draw2DElement;
                addDraw2D(draw2D: client.api.classes.render.Draw2D, x: int, y: int, width: int, height: int, zIndex: int): client.api.classes.render.components.Draw2DElement;
                addImage(x: int, y: int, width: int, height: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int): client.api.classes.render.components.Image;
                addImage(x: int, y: int, width: int, height: int, zIndex: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int): client.api.classes.render.components.Image;
                addImage(x: int, y: int, width: int, height: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): client.api.classes.render.components.Image;
                addImage(x: int, y: int, width: int, height: int, zIndex: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): client.api.classes.render.components.Image;
                addImage(x: int, y: int, width: int, height: int, zIndex: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): client.api.classes.render.components.Image;
                addImage(x: int, y: int, width: int, height: int, zIndex: int, alpha: int, color: int, id: string, imageX: int, imageY: int, regionWidth: int, regionHeight: int, textureWidth: int, textureHeight: int, rotation: double): client.api.classes.render.components.Image;
                addItem(x: int, y: int, id: string): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, id: string): client.api.classes.render.components.Item;
                addItem(x: int, y: int, id: string, overlay: boolean): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, id: string, overlay: boolean): client.api.classes.render.components.Item;
                addItem(x: int, y: int, id: string, overlay: boolean, scale: double, a5: double): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, id: string, overlay: boolean, scale: double, a6: double): client.api.classes.render.components.Item;
                addItem(x: int, y: int, item: client.api.helper.inventory.ItemStackHelper): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, item: client.api.helper.inventory.ItemStackHelper): client.api.classes.render.components.Item;
                addItem(x: int, y: int, item: client.api.helper.inventory.ItemStackHelper, overlay: boolean): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, item: client.api.helper.inventory.ItemStackHelper, overlay: boolean): client.api.classes.render.components.Item;
                addItem(x: int, y: int, item: client.api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a5: double): client.api.classes.render.components.Item;
                addItem(x: int, y: int, zIndex: int, item: client.api.helper.inventory.ItemStackHelper, overlay: boolean, scale: double, a6: double): client.api.classes.render.components.Item;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int): client.api.classes.render.components.Line;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int): client.api.classes.render.components.Line;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int, width: double): client.api.classes.render.components.Line;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int, width: double): client.api.classes.render.components.Line;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int, width: double, a6: double): client.api.classes.render.components.Line;
                addLine(x1: int, y1: int, x2: int, y2: int, color: int, zIndex: int, width: double, a7: double): client.api.classes.render.components.Line;
                addLockButton(x: int, y: int, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.LockButtonWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.LockButtonWidgetHelper;
                addLockButton(x: int, y: int, zIndex: int, callback: jsmacros.core.MethodWrapper<client.api.helper.screen.LockButtonWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.LockButtonWidgetHelper;
                addRect(x1: int, y1: int, x2: int, y2: int, color: int): client.api.classes.render.components.Rect;
                addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int): client.api.classes.render.components.Rect;
                addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int, rotation: double): client.api.classes.render.components.Rect;
                addRect(x1: int, y1: int, x2: int, y2: int, color: int, alpha: int, rotation: double, a7: int): client.api.classes.render.components.Rect;
                addSlider(x: int, y: int, width: int, height: int, text: string, value: double, a6: int, steps: jsmacros.core.MethodWrapper<client.api.helper.screen.SliderWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.SliderWidgetHelper;
                addSlider(x: int, y: int, width: int, height: int, zIndex: int, text: string, value: double, a7: jsmacros.core.MethodWrapper<client.api.helper.screen.SliderWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.SliderWidgetHelper;
                addSlider(x: int, y: int, width: int, height: int, text: string, value: double, a6: jsmacros.core.MethodWrapper<client.api.helper.screen.SliderWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.SliderWidgetHelper;
                addSlider(x: int, y: int, width: int, height: int, zIndex: int, text: string, value: double, a7: int, steps: jsmacros.core.MethodWrapper<client.api.helper.screen.SliderWidgetHelper,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.SliderWidgetHelper;
                addText(text: string, x: int, y: int, color: int, shadow: boolean): client.api.classes.render.components.Text;
                addText(text: string, x: int, y: int, color: int, zIndex: int, shadow: boolean): client.api.classes.render.components.Text;
                addText(text: string, x: int, y: int, color: int, shadow: boolean, scale: double, a6: double): client.api.classes.render.components.Text;
                addText(text: string, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: double): client.api.classes.render.components.Text;
                addText(text: client.api.helper.TextHelper, x: int, y: int, color: int, shadow: boolean): client.api.classes.render.components.Text;
                addText(text: client.api.helper.TextHelper, x: int, y: int, color: int, zIndex: int, shadow: boolean): client.api.classes.render.components.Text;
                addText(text: client.api.helper.TextHelper, x: int, y: int, color: int, shadow: boolean, scale: double, a6: double): client.api.classes.render.components.Text;
                addText(text: client.api.helper.TextHelper, x: int, y: int, color: int, zIndex: int, shadow: boolean, scale: double, a7: double): client.api.classes.render.components.Text;
                addTextInput(x: int, y: int, width: int, height: int, message: string, onChange: jsmacros.core.MethodWrapper<string,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.TextFieldWidgetHelper;
                addTextInput(x: int, y: int, width: int, height: int, zIndex: int, message: string, onChange: jsmacros.core.MethodWrapper<string,client.api.classes.render.IScreen,any,any>): client.api.helper.screen.TextFieldWidgetHelper;
                buttonBuilder(): client.api.helper.screen.ButtonWidgetHelper$ButtonBuilder;
                checkBoxBuilder(): client.api.helper.screen.CheckBoxWidgetHelper$CheckBoxBuilder;
                checkBoxBuilder(checked: boolean): client.api.helper.screen.CheckBoxWidgetHelper$CheckBoxBuilder;
                close(): void;
                cyclicButtonBuilder(valueToText: jsmacros.core.MethodWrapper<any,any,client.api.helper.TextHelper,any>): client.api.helper.screen.CyclingButtonWidgetHelper$CyclicButtonBuilder<any>;
                getButtonWidgets(): java.util.List<client.api.helper.screen.ClickableWidgetHelper<any,any>>;
                getDraw2Ds(): java.util.List<client.api.classes.render.components.Draw2DElement>;
                getElements(): java.util.List<client.api.classes.render.components.RenderElement>;
                getHeight(): int;
                getImages(): java.util.List<client.api.classes.render.components.Image>;
                getItems(): java.util.List<client.api.classes.render.components.Item>;
                getLines(): java.util.List<client.api.classes.render.components.Line>;
                getOnClose(): jsmacros.core.MethodWrapper<client.api.classes.render.IScreen,any,any,any>;
                getRects(): java.util.List<client.api.classes.render.components.Rect>;
                getScreenClassName(): string;
                getTextFields(): java.util.List<client.api.helper.screen.TextFieldWidgetHelper>;
                getTexts(): java.util.List<client.api.classes.render.components.Text>;
                getTitleText(): client.api.helper.TextHelper;
                getWidth(): int;
                handleCustomClickEvent(style: net.minecraft.class_2583, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                _init(info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                jsmacros_charTyped(chr: char, modifiers: int): void;
                jsmacros_keyPressed(keyCode: int, scanCode: int, modifiers: int): void;
                jsmacros_mouseClicked(mouseX: double, a1: double, mouseY: int): void;
                jsmacros_mouseDragged(mouseX: double, a1: double, mouseY: int, a3: double, button: double): void;
                jsmacros_mouseReleased(mouseX: double, a1: double, mouseY: int): void;
                jsmacros_mouseScrolled(mouseX: double, a1: double, mouseY: double, a3: double): void;
                jsmacros_render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                lockButtonBuilder(): client.api.helper.screen.LockButtonWidgetHelper$LockButtonBuilder;
                lockButtonBuilder(locked: boolean): client.api.helper.screen.LockButtonWidgetHelper$LockButtonBuilder;
                method_25393(): void;
                method_25419(): void;
                _method_25426(): void;
                method_25430(a0: net.minecraft.class_2583): boolean;
                _method_37063<T>(a0: T): T;
                _onHandleTextClick(style: net.minecraft.class_2583, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                reAddElement<T>(e: T): T;
                reloadScreen(): client.api.classes.render.IScreen;
                removeButton(btn: client.api.helper.screen.ClickableWidgetHelper<any,any>): client.api.classes.render.IScreen;
                removeDraw2D(draw2D: client.api.classes.render.components.Draw2DElement): client.api.classes.render.IScreen;
                removeDraw2D(a0: client.api.classes.render.components.Draw2DElement): any;
                removeElement(e: client.api.classes.render.components.RenderElement): client.api.classes.render.IScreen;
                removeElement(a0: client.api.classes.render.components.RenderElement): any;
                removeImage(i: client.api.classes.render.components.Image): client.api.classes.render.IScreen;
                removeImage(a0: client.api.classes.render.components.Image): any;
                removeItem(i: client.api.classes.render.components.Item): client.api.classes.render.IScreen;
                removeItem(a0: client.api.classes.render.components.Item): any;
                removeLine(l: client.api.classes.render.components.Line): client.api.classes.render.IScreen;
                removeLine(a0: client.api.classes.render.components.Line): any;
                removeRect(r: client.api.classes.render.components.Rect): client.api.classes.render.IScreen;
                removeRect(a0: client.api.classes.render.components.Rect): any;
                removeText(t: client.api.classes.render.components.Text): client.api.classes.render.IScreen;
                removeText(a0: client.api.classes.render.components.Text): any;
                removeTextInput(inp: client.api.helper.screen.TextFieldWidgetHelper): client.api.classes.render.IScreen;
                setOnCharTyped(onCharTyped: jsmacros.core.MethodWrapper<MixinScreen$character,int,any,any>): client.api.classes.render.IScreen;
                setOnClose(onClose: jsmacros.core.MethodWrapper<client.api.classes.render.IScreen,any,any,any>): client.api.classes.render.IScreen;
                setOnFailInit(catchInit: jsmacros.core.MethodWrapper<string,any,any,any>): client.api.classes.render.IScreen;
                setOnFailInit(a0: jsmacros.core.MethodWrapper): any;
                setOnInit(onInit: jsmacros.core.MethodWrapper<client.api.classes.render.IScreen,any,any,any>): client.api.classes.render.IScreen;
                setOnInit(a0: jsmacros.core.MethodWrapper): any;
                setOnKeyPressed(onKeyPressed: jsmacros.core.MethodWrapper<int,int,any,any>): client.api.classes.render.IScreen;
                setOnMouseDown(onMouseDown: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>): client.api.classes.render.IScreen;
                setOnMouseDrag(onMouseDrag: jsmacros.core.MethodWrapper<jsmacros.api.math.Vec2D,int,any,any>): client.api.classes.render.IScreen;
                setOnMouseUp(onMouseUp: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>): client.api.classes.render.IScreen;
                setOnScroll(onScroll: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,jsmacros.api.math.Pos2D,any,any>): client.api.classes.render.IScreen;
                sliderBuilder(): client.api.helper.screen.SliderWidgetHelper$SliderBuilder;
                textFieldBuilder(): client.api.helper.screen.TextFieldWidgetHelper$TextFieldBuilder;
                texturedButtonBuilder(): client.api.helper.screen.ButtonWidgetHelper$TexturedButtonBuilder;
                _catchInit: jsmacros.core.MethodWrapper<string,any,any,any>;
                _elements: java.util.Set<client.api.classes.render.components.RenderElement>;
                _field_22785: net.minecraft.class_2561;
                _field_22786: java.util.List<net.minecraft.class_364>;
                field_22787: net.minecraft.class_310;
                field_22789: int;
                field_22790: int;
                field_22793: net.minecraft.class_327;
                _onCharTyped: jsmacros.core.MethodWrapper<access$character,int,any,any>;
                _onClose: jsmacros.core.MethodWrapper<client.api.classes.render.IScreen,any,any,any>;
                _onInit: jsmacros.core.MethodWrapper<client.api.classes.render.IScreen,any,any,any>;
                _onKeyPressed: jsmacros.core.MethodWrapper<int,int,any,any>;
                _onMouseDown: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>;
                _onMouseDrag: jsmacros.core.MethodWrapper<jsmacros.api.math.Vec2D,int,any,any>;
                _onMouseUp: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,int,any,any>;
                _onScroll: jsmacros.core.MethodWrapper<jsmacros.api.math.Pos2D,jsmacros.api.math.Pos2D,any,any>;
              }
              interface MixinScreen extends CombineTypes<[_MixinScreen, net.minecraft.class_362, xyz.wagyourtail.jsmacros.client.api.classes.render.IScreen, xyz.wagyourtail.jsmacros.client.access.IScreenInternal]> {}
              interface _MixinShulkerEntity$$static extends ClassLike {
              }
              let MixinShulkerEntity: _MixinShulkerEntity$$static;
              interface _MixinShulkerEntity {
                invokeIsClosed(): boolean;
(): boolean;
              }
              interface MixinShulkerEntity extends CombineTypes<[_MixinShulkerEntity, java.lang.Object]> {}
              interface _MixinSignEditScreen$$static extends ClassLike {
                new(): MixinSignEditScreen;
              }
              let MixinSignEditScreen: _MixinSignEditScreen$$static;
              interface _MixinSignEditScreen {
                jsmacros_fixSelection(): void;
                jsmacros_setLine(line: int, text: string): void;
                _field_40425: string[];
                _field_40428: int;
                _field_40429: net.minecraft.class_3728;
                _field_43362: net.minecraft.class_8242;
              }
              interface MixinSignEditScreen extends CombineTypes<[_MixinSignEditScreen, xyz.wagyourtail.jsmacros.client.access.ISignEditScreen, java.lang.Object]> {}
              interface _MixinSimpleOption$$static extends ClassLike {
              }
              let MixinSimpleOption: _MixinSimpleOption$$static;
              interface _MixinSimpleOption {
                forceSetValue<T>(a0: T): void;
<T>(a0: T): void;
              }
              interface MixinSimpleOption extends CombineTypes<[_MixinSimpleOption, java.lang.Object]> {}
              interface _MixinSpellcastingIllagerEntityHelper$$static extends ClassLike {
              }
              let MixinSpellcastingIllagerEntityHelper: _MixinSpellcastingIllagerEntityHelper$$static;
              interface _MixinSpellcastingIllagerEntityHelper {
                getSpellKey(): net.minecraft.class_2940<byte>;
(): net.minecraft.class_2940<byte>;
              }
              interface MixinSpellcastingIllagerEntityHelper extends CombineTypes<[_MixinSpellcastingIllagerEntityHelper, java.lang.Object]> {}
              interface _MixinStatHandler$$static extends ClassLike {
              }
              let MixinStatHandler: _MixinStatHandler$$static;
              interface _MixinStatHandler {
                getStatMap(): it.unimi.dsi.fastutil.objects.Object2IntMap<net.minecraft.class_3445<any>>;
(): it.unimi.dsi.fastutil.objects.Object2IntMap<net.minecraft.class_3445<any>>;
              }
              interface MixinStatHandler extends CombineTypes<[_MixinStatHandler, java.lang.Object]> {}
              interface _MixinStyleSerializer$$static extends ClassLike {
                new(): MixinStyleSerializer;
              }
              let MixinStyleSerializer: _MixinStyleSerializer$$static;
              interface _MixinStyleSerializer {
              }
              interface MixinStyleSerializer extends CombineTypes<[_MixinStyleSerializer, java.lang.Object]> {}
              interface _MixinTextFieldWidget$$static extends ClassLike {
              }
              let MixinTextFieldWidget: _MixinTextFieldWidget$$static;
              interface _MixinTextFieldWidget {
                getEditable(): boolean;
                getMaxLength(): int;
              }
              interface MixinTextFieldWidget extends CombineTypes<[_MixinTextFieldWidget, java.lang.Object]> {}
              interface _MixinTranslationStorage$$static extends ClassLike {
                _insertFabricLanguageData(resourceManager: net.minecraft.class_3300, definitions: java.util.List<string>, rightToLeft: boolean, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<net.minecraft.class_1078>, map: java.util.Map<string,string>): void;
                new(): MixinTranslationStorage;
              }
              let MixinTranslationStorage: _MixinTranslationStorage$$static;
              interface _MixinTranslationStorage {
              }
              interface MixinTranslationStorage extends CombineTypes<[_MixinTranslationStorage, java.lang.Object]> {}
              interface _MixinTridentEntity$$static extends ClassLike {
              }
              let MixinTridentEntity: _MixinTridentEntity$$static;
              interface _MixinTridentEntity {
                getLoyalty(): net.minecraft.class_2940<byte>;
(): net.minecraft.class_2940<byte>;
              }
              interface MixinTridentEntity extends CombineTypes<[_MixinTridentEntity, java.lang.Object]> {}
            }
            module events {
              interface _MixinChatHud$$static extends ClassLike {
                _new(): MixinChatHud;
              }
              let MixinChatHud: _MixinChatHud$$static;
              interface _MixinChatHud {
                _modifyChatMessage(text: net.minecraft.class_2561): net.minecraft.class_2561;
                _modifyChatMessageSignature(signature: net.minecraft.class_7591): net.minecraft.class_7591;
                _onAddChatMessage(message: net.minecraft.class_2561, signature: net.minecraft.class_7469, indicator: net.minecraft.class_7591, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _onAddMessage1(message: net.minecraft.class_2561, signature: net.minecraft.class_7469, indicator: net.minecraft.class_7591, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _MODIFIED_TEXT: net.minecraft.class_2561;
                _jsmacros$eventRecvMessage: client.api.event.impl.EventRecvMessage;
                _jsmacros$modifiedEventRecieve: boolean;
                _jsmacros$originalMessage: net.minecraft.class_2561;
              }
              interface MixinChatHud extends CombineTypes<[_MixinChatHud, java.lang.Object]> {}
              interface _MixinChatScreen$$static extends ClassLike {
                _new(title: net.minecraft.class_2561): MixinChatScreen;
              }
              let MixinChatScreen: _MixinChatScreen$$static;
              interface _MixinChatScreen {
                onSendChatMessage(chatText: string, addToHistory: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
              }
              interface MixinChatScreen extends CombineTypes<[_MixinChatScreen, net.minecraft.class_437]> {}
              interface _MixinClientConnection$$static extends ClassLike {
                new(): MixinClientConnection;
              }
              let MixinClientConnection: _MixinClientConnection$$static;
              interface _MixinClientConnection {
                modifyReceivedPacket(packet: net.minecraft.class_2596<any>): net.minecraft.class_2596<any>;
                modifySendPacket(packet: net.minecraft.class_2596<any>): net.minecraft.class_2596<any>;
                _onReceivePacket(channelHandlerContext: io.netty.channel.ChannelHandlerContext, packet: net.minecraft.class_2596<any>, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _onSendPacket(packet: net.minecraft.class_2596<any>, listener: io.netty.channel.ChannelFutureListener, flush: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_11651: io.netty.channel.Channel;
                _jsmacros$eventRecvPacket: client.api.event.impl.EventRecvPacket;
                _jsmacros$eventSendPacket: client.api.event.impl.EventSendPacket;
              }
              interface MixinClientConnection extends CombineTypes<[_MixinClientConnection, java.lang.Object]> {}
              interface _MixinClientPlayNetworkHandler$$static extends ClassLike {
                _new(arg: net.minecraft.class_310, arg2: net.minecraft.class_2535, arg3: net.minecraft.class_8675): MixinClientPlayNetworkHandler;
              }
              let MixinClientPlayNetworkHandler: _MixinClientPlayNetworkHandler$$static;
              interface _MixinClientPlayNetworkHandler {
                onBlockEntityUpdate(packet: net.minecraft.class_2622, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onBlockUpdate(packet: net.minecraft.class_2626, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onBossBar(packet: net.minecraft.class_2629, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onChunkData(packet: net.minecraft.class_2672, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onChunkDeltaUpdate(packet: net.minecraft.class_2637, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _onDeath(packet: net.minecraft.class_5892, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onEntityStatusEffect(packet: net.minecraft.class_2783, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onEntityStatusEffect(packet: net.minecraft.class_2718, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onGameJoin(packet: net.minecraft.class_2678, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onHeldSlotUpdate(packet: net.minecraft.class_9834, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onInventorySlotUpdate(packet: net.minecraft.class_9835, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onInventoryUpdate(packet: net.minecraft.class_2649, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onItemPickupAnimation(packet: net.minecraft.class_2775, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onOverlayMessage(title: net.minecraft.class_2561): net.minecraft.class_2561;
                onPlayerList(packet: net.minecraft.class_2703, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo, var2: java.util.Iterator, entry: net.minecraft.class_2703$class_2705, playerListEntry: net.minecraft.class_640): void;
                onPlayerListEnd(packet: net.minecraft.class_7828, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo, var2: java.util.Iterator, uUID: java.util.UUID, playerListEntry: net.minecraft.class_640): void;
                onScreenSlotUpdate(packet: net.minecraft.class_2653, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onScreenSlotUpdate2(packet: net.minecraft.class_2653, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onSubtitle(title: net.minecraft.class_2561): net.minecraft.class_2561;
                onTitle(title: net.minecraft.class_2561): net.minecraft.class_2561;
                onUnloadChunk(packet: net.minecraft.class_2666, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_3693: java.util.Map<java.util.UUID,net.minecraft.class_640>;
                _field_3699: net.minecraft.class_638;
                _newPlayerEntries: java.util.Set<java.util.UUID>;
              }
              interface MixinClientPlayNetworkHandler extends CombineTypes<[_MixinClientPlayNetworkHandler, net.minecraft.class_8673]> {}
              interface _MixinClientPlayerEntity$$static extends ClassLike {
                new(world: net.minecraft.class_638, profile: com.mojang.authlib.GameProfile): MixinClientPlayerEntity;
              }
              let MixinClientPlayerEntity: _MixinClientPlayerEntity$$static;
              interface _MixinClientPlayerEntity {
                method_20303(): boolean;
(): boolean;
                method_5855(air: int): void;
                onDropSelected(entireStack: boolean, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                onOpenEditSignScreen(sign: net.minecraft.class_2625, front: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onSetExperience(progress: float, total: int, level: int, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onStartRiding(entity: net.minecraft.class_1297, force: boolean, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                onStopRiding(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                overwriteInputs(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                field_3913: net.minecraft.class_744;
                _field_3937: net.minecraft.class_310;
                field_3944: net.minecraft.class_634;
              }
              interface MixinClientPlayerEntity extends CombineTypes<[_MixinClientPlayerEntity, net.minecraft.class_742]> {}
              interface _MixinClientPlayerInteractionManager$$static extends ClassLike {
                new(): MixinClientPlayerInteractionManager;
              }
              let MixinClientPlayerInteractionManager: _MixinClientPlayerInteractionManager$$static;
              interface _MixinClientPlayerInteractionManager {
                onAttackBlock(pos: net.minecraft.class_2338, direction: net.minecraft.class_2350, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<boolean>): void;
                onAttackEntity(player: net.minecraft.class_1657, target: net.minecraft.class_1297, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onInteractBlock(player: net.minecraft.class_746, hand: net.minecraft.class_1268, hitResult: net.minecraft.class_3965, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<net.minecraft.class_1269>): void;
                onInteractEntity(player: net.minecraft.class_1657, entity: net.minecraft.class_1297, hand: net.minecraft.class_1268, cir: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<net.minecraft.class_1269>): void;
                _field_3712: net.minecraft.class_310;
              }
              interface MixinClientPlayerInteractionManager extends CombineTypes<[_MixinClientPlayerInteractionManager, java.lang.Object]> {}
              interface _MixinClientWorld$$static extends ClassLike {
                new(): MixinClientWorld;
              }
              let MixinClientWorld: _MixinClientWorld$$static;
              interface _MixinClientWorld {
                onAddEntity(entity: net.minecraft.class_1297, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onRemoveEntity(entityId: int, removalReason: net.minecraft.class_1297$class_5529, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo, entity: net.minecraft.class_1297): void;
              }
              interface MixinClientWorld extends CombineTypes<[_MixinClientWorld, java.lang.Object]> {}
              interface _MixinCreativeInventoryScreen$$static extends ClassLike {
                _jsmacros$creativeSlot: java.lang.Class<net.minecraft.class_1735>;
                _jsmacros$lockableSlot: java.lang.Class<net.minecraft.class_1735>;
                _jsmacros$slotInCreativeSlot: java.lang.reflect.Field;
                new(): MixinCreativeInventoryScreen;
              }
              let MixinCreativeInventoryScreen: _MixinCreativeInventoryScreen$$static;
              interface _MixinCreativeInventoryScreen {
                beforeMouseClick(slot: net.minecraft.class_1735, slotId: int, button: int, actionType: net.minecraft.class_1713, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
              }
              interface MixinCreativeInventoryScreen extends CombineTypes<[_MixinCreativeInventoryScreen, java.lang.Object]> {}
              interface _MixinDataTracker$$static extends ClassLike {
                new(): MixinDataTracker;
              }
              let MixinDataTracker: _MixinDataTracker$$static;
              interface _MixinDataTracker {
                onCopyToFrom(to: net.minecraft.class_2945$class_2946<java.util.Optional<net.minecraft.class_2561>>, from: net.minecraft.class_2945$class_7834<java.util.Optional<net.minecraft.class_2561>>, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_13333: net.minecraft.class_9221;
              }
              interface MixinDataTracker extends CombineTypes<[_MixinDataTracker, java.lang.Object]> {}
              interface _MixinHandledScreen$$static extends ClassLike {
                new(): MixinHandledScreen;
              }
              let MixinHandledScreen: _MixinHandledScreen$$static;
              interface _MixinHandledScreen {
                beforeMouseClick(slot: net.minecraft.class_1735, slotId: int, button: int, actionType: net.minecraft.class_1713, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
              }
              interface MixinHandledScreen extends CombineTypes<[_MixinHandledScreen, java.lang.Object]> {}
              interface _MixinHungerManager$$static extends ClassLike {
                new(): MixinHungerManager;
              }
              let MixinHungerManager: _MixinHungerManager$$static;
              interface _MixinHungerManager {
                onSetFoodLevel(foodLevel: int, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_7756: int;
              }
              interface MixinHungerManager extends CombineTypes<[_MixinHungerManager, java.lang.Object]> {}
              interface _MixinKeyboard$$static extends ClassLike {
                _new(): MixinKeyboard;
              }
              let MixinKeyboard: _MixinKeyboard$$static;
              interface _MixinKeyboard {
                _onKey(window: long, a1: int, key: int, scancode: int, action: int, mods: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_1678: net.minecraft.class_310;
              }
              interface MixinKeyboard extends CombineTypes<[_MixinKeyboard, java.lang.Object]> {}
              interface _MixinLivingEntity$$static extends ClassLike {
                new(arg: net.minecraft.class_1299<any>, arg2: net.minecraft.class_1937): MixinLivingEntity;
              }
              let MixinLivingEntity: _MixinLivingEntity$$static;
              interface _MixinLivingEntity {
                method_6063(): float;
(): float;
                _onInit(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onSetHealth(health: float, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _jsmacros$lastHealth: float;
              }
              interface MixinLivingEntity extends CombineTypes<[_MixinLivingEntity, net.minecraft.class_1297]> {}
              interface _MixinMessageHandler$$static extends ClassLike {
                new(): MixinMessageHandler;
              }
              let MixinMessageHandler: _MixinMessageHandler$$static;
              interface _MixinMessageHandler {
                _modifyOverlayMessage(text: net.minecraft.class_2561): net.minecraft.class_2561;
              }
              interface MixinMessageHandler extends CombineTypes<[_MixinMessageHandler, java.lang.Object]> {}
              interface _MixinMinecraftClient$$static extends ClassLike {
                new(): MixinMinecraftClient;
              }
              let MixinMinecraftClient: _MixinMinecraftClient$$static;
              interface _MixinMinecraftClient {
                afterOpenScreen(screen: net.minecraft.class_437, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                method_1507(a0: net.minecraft.class_437): void;
(a0: net.minecraft.class_437): void;
                onDisconnect(s: net.minecraft.class_437, transferring: boolean, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onJoinWorld(world: net.minecraft.class_638, worldEntryReason: net.minecraft.class_434$class_9678, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                onOpenScreen(screen: net.minecraft.class_437, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _onStart(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_1726: net.minecraft.class_320;
                field_1755: net.minecraft.class_437;
                field_1761: net.minecraft.class_636;
                _jsmacros$prevScreen: net.minecraft.class_437;
              }
              interface MixinMinecraftClient extends CombineTypes<[_MixinMinecraftClient, java.lang.Object]> {}
              interface _MixinMouse$$static extends ClassLike {
                _new(): MixinMouse;
              }
              let MixinMouse: _MixinMouse$$static;
              interface _MixinMouse {
                _onMouseButton(window: long, a1: int, key: int, action: int, mods: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _onMouseScroll(window: long, a1: double, horizontal: double, a3: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_1779: net.minecraft.class_310;
              }
              interface MixinMouse extends CombineTypes<[_MixinMouse, java.lang.Object]> {}
              interface _MixinSoundSystem$$static extends ClassLike {
                new(): MixinSoundSystem;
              }
              let MixinSoundSystem: _MixinSoundSystem$$static;
              interface _MixinSoundSystem {
                onPlay(instance: net.minecraft.class_1113, info: org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable<net.minecraft.class_1140$class_11518>): void;
              }
              interface MixinSoundSystem extends CombineTypes<[_MixinSoundSystem, java.lang.Object]> {}
              interface _MixinSplashOverlay$$static extends ClassLike {
                new(): MixinSplashOverlay;
              }
              let MixinSplashOverlay: _MixinSplashOverlay$$static;
              interface _MixinSplashOverlay {
                _onReloadComplete(ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_18219: boolean;
              }
              interface MixinSplashOverlay extends CombineTypes<[_MixinSplashOverlay, java.lang.Object]> {}
              interface _MixinWorldRenderer$$static extends ClassLike {
                new(): MixinWorldRenderer;
              }
              let MixinWorldRenderer: _MixinWorldRenderer$$static;
              interface _MixinWorldRenderer {
                _onRenderMain(frameGraphBuilder: net.minecraft.class_9909, frustum: net.minecraft.class_4604, camera: net.minecraft.class_4184, positionMatrix: org.joml.Matrix4f, fog: com.mojang.blaze3d.buffers.GpuBufferSlice, renderBlockOutline: boolean, renderEntityOutline: boolean, tickCounter: net.minecraft.class_9779, profiler: net.minecraft.class_3695, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                _field_53081: net.minecraft.class_9960;
              }
              interface MixinWorldRenderer extends CombineTypes<[_MixinWorldRenderer, java.lang.Object]> {}
            }
            interface _JSMacrosMixinPlugin$$static extends ClassLike {
              _isRunningOnFabric(): boolean;
              _resolveDestinationNamespace(): string;
              _setIfAbsent(key: string, value: string): void;
              _FABRIC_LOADER_CLASS: string;
              _NEOFORGE_DIST_PROP: string;
              new(): JSMacrosMixinPlugin;
            }
            let JSMacrosMixinPlugin: _JSMacrosMixinPlugin$$static;
            interface _JSMacrosMixinPlugin {
              acceptTargets(myTargets: java.util.Set<string>, otherTargets: java.util.Set<string>): void;
              getMixins(): java.util.List<string>;
              getRefMapperConfig(): string;
              onLoad(mixinPackage: string): void;
              postApply(targetClassName: string, targetClass: org.objectweb.asm.tree.ClassNode, mixinClassName: string, mixinInfo: org.spongepowered.asm.mixin.extensibility.IMixinInfo): void;
              preApply(targetClassName: string, targetClass: org.objectweb.asm.tree.ClassNode, mixinClassName: string, mixinInfo: org.spongepowered.asm.mixin.extensibility.IMixinInfo): void;
              shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
            }
            interface JSMacrosMixinPlugin extends CombineTypes<[_JSMacrosMixinPlugin, java.lang.Object, org.spongepowered.asm.mixin.extensibility.IMixinConfigPlugin]> {}
          }
          module movement {
            interface _MovementDummy$$static extends ClassLike {
              new(player: MovementDummy): MovementDummy;
              new(player: net.minecraft.class_746): MovementDummy;
              new(world: net.minecraft.class_1937, pos: net.minecraft.class_243, velocity: net.minecraft.class_243, hitBox: net.minecraft.class_238, onGround: boolean, isSprinting: boolean, isSneaking: boolean): MovementDummy;
            }
            let MovementDummy: _MovementDummy$$static;
            interface _MovementDummy {
              applyInput(input: jsmacros.api.PlayerInput): net.minecraft.class_243;
              _canChangeIntoPose(pose: net.minecraft.class_4050): boolean;
              _canClimb(): boolean;
              clone(): MovementDummy;
              clone(): any;
              getCoordsHistory(): java.util.List<net.minecraft.class_243>;
              getInputs(): java.util.List<jsmacros.api.PlayerInput>;
              method_5673(slot: net.minecraft.class_1304, stack: net.minecraft.class_1799): void;
              method_5728(sprinting: boolean): void;
              method_6047(): net.minecraft.class_1799;
              method_6068(): net.minecraft.class_1306;
              method_6091(movementInput: net.minecraft.class_243): void;
              method_6118(slot: net.minecraft.class_1304): net.minecraft.class_1799;
              method_66249(): boolean;
              _coordsHistory: java.util.List<net.minecraft.class_243>;
              _equippedStack: java.util.Map<net.minecraft.class_1304,net.minecraft.class_1799>;
              _inputs: java.util.List<jsmacros.api.PlayerInput>;
              _jumpingCooldown: int;
            }
            interface MovementDummy extends CombineTypes<[_MovementDummy, net.minecraft.class_1309]> {}
            interface _MovementQueue$$static extends ClassLike {
              append(input: jsmacros.api.PlayerInput, newPlayer: net.minecraft.class_746): void;
              _calcPredictions(): void;
              clear(): void;
              _drawPredictions(): void;
              setDrawPredictions(val: boolean): void;
              tick(newPlayer: net.minecraft.class_746): jsmacros.api.PlayerInput;
              _doDrawPredictions: boolean;
              _player: net.minecraft.class_746;
              predPoints: client.api.classes.render.Draw3D;
              _predictions: java.util.List<net.minecraft.class_243>;
              _queue: java.util.List<jsmacros.api.PlayerInput>;
              _queuePos: int;
              _reCalcPredictions: boolean;
              new(): MovementQueue;
            }
            let MovementQueue: _MovementQueue$$static;
            interface _MovementQueue {
            }
            interface MovementQueue extends CombineTypes<[_MovementQueue, java.lang.Object]> {}
          }
          module tick {
            interface _TPSData$$static extends ClassLike {
              new(time: long, a1: double): TPSData;
            }
            let TPSData: _TPSData$$static;
            interface _TPSData {
              readonly recvTime: long;
              readonly tps: double;
            }
            interface TPSData extends CombineTypes<[_TPSData, java.lang.Object]> {}
            interface _TickBasedEvents$$static extends ClassLike {
              areEqualIgnoreDamage(a: net.minecraft.class_1799, b: net.minecraft.class_1799): boolean;
              areNotEqual(a: net.minecraft.class_1799, b: net.minecraft.class_1799): boolean;
              areTagsEqualIgnoreDamage(a: net.minecraft.class_1799, b: net.minecraft.class_1799): boolean;
              onTick(mc: net.minecraft.class_310): void;
              _chestArmor: net.minecraft.class_1799;
              _counter: long;
              _footArmor: net.minecraft.class_1799;
              _headArmor: net.minecraft.class_1799;
              _legArmor: net.minecraft.class_1799;
              _mainHand: net.minecraft.class_1799;
              _offHand: net.minecraft.class_1799;
              _previousFallFlyState: boolean;
              readonly serverListPinger: net.minecraft.class_644;
              new(): TickBasedEvents;
            }
            let TickBasedEvents: _TickBasedEvents$$static;
            interface _TickBasedEvents {
            }
            interface TickBasedEvents extends CombineTypes<[_TickBasedEvents, java.lang.Object]> {}
            interface _TickSync$$static extends ClassLike {
              new(): TickSync;
            }
            let TickSync: _TickSync$$static;
            interface _TickSync {
              tick(): void;
              waitTick(): void;
              waitTicks(ticks: int): void;
              _minHeap: java.util.PriorityQueue<TickSync$TickSyncInt>;
              _tc: int;
            }
            interface TickSync extends CombineTypes<[_TickSync, java.lang.Object]> {}
            interface _TickSync$TickSyncInt$$static extends ClassLike {
              new(tick: int): TickSync$TickSyncInt;
            }
            let TickSync$TickSyncInt: _TickSync$TickSyncInt$$static;
            interface _TickSync$TickSyncInt {
              compareTo(o: TickSync$TickSyncInt): int;
              compareTo(a0: any): int;
              readonly tick: int;
            }
            interface TickSync$TickSyncInt extends CombineTypes<[_TickSync$TickSyncInt, java.lang.Comparable<TickSync$TickSyncInt>, java.lang.Object]> {}
          }
          module util {
            interface _ColorUtil$$static extends ClassLike {
              fixAlpha(color: int): int;
              new(): ColorUtil;
            }
            let ColorUtil: _ColorUtil$$static;
            interface _ColorUtil {
            }
            interface ColorUtil extends CombineTypes<[_ColorUtil, java.lang.Object]> {}
          }
          interface _ConfigFolder$$static extends ClassLike {
          }
          let ConfigFolder: _ConfigFolder$$static;
          interface _ConfigFolder {
            getFolder(): java.io.File;
(): java.io.File;
          }
          interface ConfigFolder extends CombineTypes<[_ConfigFolder, java.lang.Object]> {}
          interface _DataGen$$static extends ClassLike {
            main(args: string[]): void;
            new(): DataGen;
          }
          let DataGen: _DataGen$$static;
          interface _DataGen {
          }
          interface DataGen extends CombineTypes<[_DataGen, java.lang.Object]> {}
          interface _JsMacros$$static extends ClassLike {
            getModLoader(): ModLoader;
            onInitialize(): void;
            range(end: int): int[];
            range(start: int, end: int): int[];
            range(start: int, end: int, iter: int): int[];
            readonly LOGGER: org.slf4j.Logger;
            readonly MOD_ID: string;
            _configFolder: java.io.File;
            _modLoader: ModLoader;
            new(): JsMacros;
          }
          let JsMacros: _JsMacros$$static;
          interface _JsMacros {
          }
          interface JsMacros extends CombineTypes<[_JsMacros, java.lang.Object]> {}
          interface _JsMacrosClient$$static extends ClassLike {
            getKeyText(translationKey: string): net.minecraft.class_2561;
            getLocalizedName(keyCode: net.minecraft.class_3675$class_306): string;
            getMinecraft(): net.minecraft.class_310;
            getScreenName(s: net.minecraft.class_437): string;
            onInitializeClient(): void;
            readonly clientCore: jsmacros.core.Core<config.ClientProfile,event.EventRegistry>;
            keyBinding: net.minecraft.class_304;
            prevScreen: wagyourtail.wagyourgui.BaseScreen;
            new(): JsMacrosClient;
          }
          let JsMacrosClient: _JsMacrosClient$$static;
          interface _JsMacrosClient {
          }
          interface JsMacrosClient extends CombineTypes<[_JsMacrosClient, xyz.wagyourtail.jsmacros.client.JsMacros]> {}
          interface _ModLoader$$static extends ClassLike {
          }
          let ModLoader: _ModLoader$$static;
          interface _ModLoader {
            getLoadedMods(): java.util.List<jsmacros.api.helper.ModContainerHelper<any>>;
            getMod(a0: string): jsmacros.api.helper.ModContainerHelper<any>;
            getName(): string;
            isDevEnv(): boolean;
            isModLoaded(a0: string): boolean;
          }
          interface ModLoader extends CombineTypes<[_ModLoader, java.lang.Object]> {}
        }
        module core {
          module classes {
            interface _Registrable$$static<R> extends ClassLike {
            }
            let Registrable: _Registrable$$static<R>;
            interface _Registrable<R> {
              register(): R;
              unregister(): R;
            }
            interface Registrable<R> extends CombineTypes<[_Registrable<R>, java.lang.Object]> {}
          }
          module config {
            interface _BaseProfile$$static extends ClassLike {
              new(runner: Core, logger: org.slf4j.Logger): BaseProfile;
            }
            let BaseProfile: _BaseProfile$$static;
            interface _BaseProfile {
              checkJoinedThreadStack(): boolean;
              getCurrentProfileName(): string;
              getRegistry(): core.event.BaseEventRegistry;
              init(defaultProfile: string): void;
              _initRegistries(): void;
              loadOrCreateProfile(profileName: string): void;
              _loadProfile(pName: string): boolean;
              logError(a0: java.lang.Throwable): void;
              renameCurrentProfile(profile: string): void;
              _runJoinedEventListener(event: core.event.BaseEvent, joinedMain: boolean, macroListener: core.event.IEventListener): void;
              saveProfile(): void;
              triggerEvent(event: core.event.BaseEvent): void;
              readonly LOGGER: org.slf4j.Logger;
              readonly joinedThreadStack: java.util.Set<java.lang.Thread>;
              profileName: string;
              readonly runner: Core<any,any>;
            }
            interface BaseProfile extends CombineTypes<[_BaseProfile, java.lang.Object]> {}
            interface _ConfigManager$$static extends ClassLike {
              _gson: com.google.gson.Gson;
              new(runner: Core<any,any>, configFolder: java.io.File, macroFolder: java.io.File, logger: org.slf4j.Logger): ConfigManager;
            }
            let ConfigManager: _ConfigManager$$static;
            interface _ConfigManager {
              addOptions(key: string, optionClass: java.lang.Class<any>): void;
              backupConfig(): void;
              _convertOrLoadConfig(key: string, clazz: java.lang.Class<any>): void;
              _convertOrLoadConfigs(): void;
              getOptions<T>(optionClass: java.lang.Class<T>): T;
              loadConfig(): void;
              loadDefaults(): void;
              reloadRawConfigFromFile(): void;
              saveConfig(): void;
              readonly LOGGER: org.slf4j.Logger;
              readonly configFile: java.io.File;
              readonly configFolder: java.io.File;
              _loadedAsVers: int;
              readonly macroFolder: java.io.File;
              readonly optionClasses: java.util.Map<string,java.lang.Class<any>>;
              readonly options: java.util.Map<java.lang.Class<any>,any>;
              rawOptions: com.google.gson.JsonObject;
              _runner: Core<any,any>;
            }
            interface ConfigManager extends CombineTypes<[_ConfigManager, java.lang.Object]> {}
            interface _CoreConfigV2$$static extends ClassLike {
              new(): CoreConfigV2;
            }
            let CoreConfigV2: _CoreConfigV2$$static;
            interface _CoreConfigV2 {
              fromV1(v1: com.google.gson.JsonObject): void;
              getCurrentProfile(): string;
              getEvents(): java.util.List<string>;
              profileOptions(): java.util.List<string>;
              setCurrentProfile(pname: string): void;
              anythingIgnored: java.util.List<string>;
              defaultProfile: string;
              maxLockTime: long;
              profiles: java.util.Map<string,java.util.List<ScriptTrigger>>;
              _runner: Core<any,any>;
              services: java.util.Map<string,core.service.ServiceTrigger>;
            }
            interface CoreConfigV2 extends CombineTypes<[_CoreConfigV2, java.lang.Object]> {}
            interface _Option$$static extends ClassLike {
            }
            let Option: _Option$$static;
            interface _Option {
              getter(): string;
              group(): string[];
              options(): string;
              setter(): string;
              translationKey(): string;
              type(): OptionType;
            }
            interface Option extends CombineTypes<[_Option, java.lang.annotation.Annotation, java.lang.Object]> {}
            interface _OptionType$$static extends ClassLike {
            }
            let OptionType: _OptionType$$static;
            interface _OptionType {
              options(): string[];
              value(): string;
            }
            interface OptionType extends CombineTypes<[_OptionType, java.lang.annotation.Annotation, java.lang.Object]> {}
            interface _ScriptTrigger$$static extends ClassLike {
              copy(m: ScriptTrigger): ScriptTrigger;
              new(triggerType: ScriptTrigger$TriggerType, event: string, scriptFile: java.nio.file.Path, enabled: boolean, joined: boolean): ScriptTrigger;
              new(triggerType: ScriptTrigger$TriggerType, event: string, scriptFile: string, enabled: boolean, joined: boolean): ScriptTrigger;
            }
            let ScriptTrigger: _ScriptTrigger$$static;
            interface _ScriptTrigger {
              copy(): ScriptTrigger;
              equals(macro: ScriptTrigger): boolean;
              getEnabled(): boolean;
              getEvent(): string;
              getScriptFile(): string;
              getScriptPath(): java.nio.file.Path;
              getTriggerType(): ScriptTrigger$TriggerType;
              toString(): string;
              enabled: boolean;
              event: string;
              joined: boolean;
              scriptFile: java.nio.file.Path;
              triggerType: ScriptTrigger$TriggerType;
            }
            interface ScriptTrigger extends CombineTypes<[_ScriptTrigger, java.lang.Object]> {}
            interface _ScriptTrigger$TriggerType$$static extends ClassLike {
              valueOf(name: string): ScriptTrigger$TriggerType;
              values(): ScriptTrigger$TriggerType[];
              readonly EVENT: ScriptTrigger$TriggerType;
              readonly KEY_BOTH: ScriptTrigger$TriggerType;
              readonly KEY_FALLING: ScriptTrigger$TriggerType;
              readonly KEY_RISING: ScriptTrigger$TriggerType;
            }
            let ScriptTrigger$TriggerType: _ScriptTrigger$TriggerType$$static;
            interface _ScriptTrigger$TriggerType {
            }
            interface ScriptTrigger$TriggerType extends CombineTypes<[_ScriptTrigger$TriggerType]> {}
          }
          module event {
            module impl {
              interface _EventCustom$$static extends ClassLike {
                new(runner: Core<any,any>, eventName: string): EventCustom;
              }
              let EventCustom: _EventCustom$$static;
              interface _EventCustom {
                cancellable(): boolean;
                getBoolean(name: string): boolean;
                getDouble(name: string): double;
                getInt(name: string): int;
                getObject(name: string): any;
                getString(name: string): string;
                getType(name: string): string;
                getUnderlyingMap(): java.util.Map<string,any>;
                joinable(): boolean;
                putBoolean(name: string, b: boolean): boolean;
                putDouble(name: string, d: double): double;
                putInt(name: string, i: int): int;
                putObject(name: string, o: any): any;
                putString(name: string, str: string): string;
                registerEvent(): void;
                trigger(): void;
                triggerAsync(callback: MethodWrapper<any,any,any,any>): void;
                _args: java.util.Map<string,any>;
                cancelable: boolean;
                eventName: string;
                joinable: boolean;
              }
              interface EventCustom extends CombineTypes<[_EventCustom, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
              interface _EventProfileLoad$$static extends ClassLike {
                new(profile: core.config.BaseProfile, profileName: string): EventProfileLoad;
              }
              let EventProfileLoad: _EventProfileLoad$$static;
              interface _EventProfileLoad {
                toString(): string;
                readonly profileName: string;
              }
              interface EventProfileLoad extends CombineTypes<[_EventProfileLoad, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
              interface _EventWrappedScript$$static<T,U,R> extends ClassLike {
                new(runner: Core<any,any>, arg1: T, arg2: U): EventWrappedScript<T,U,R>;
              }
              let EventWrappedScript: _EventWrappedScript$$static<T,U,R>;
              interface _EventWrappedScript<T,U,R> {
                setReturnBoolean(b: boolean): void;
                setReturnDouble(d: double): void;
                setReturnInt(i: int): void;
                setReturnObject(o: any): void;
                setReturnString(s: string): void;
                toString(): string;
                readonly arg1: T;
                readonly arg2: U;
                result: R;
              }
              interface EventWrappedScript<T,U,R> extends CombineTypes<[_EventWrappedScript<T,U,R>, BaseEvent]> {}
              interface _FiltererComposed$$static extends ClassLike {
                new(initial: EventFilterer): FiltererComposed;
              }
              let FiltererComposed: _FiltererComposed$$static;
              interface _FiltererComposed {
                and(filterer: EventFilterer): FiltererComposed;
                canFilter(event: string): boolean;
                checkCyclicRef(base: EventFilterer$Compound): void;
                or(filterer: EventFilterer): FiltererComposed;
                test(event: BaseEvent): boolean;
                _components: java.util.LinkedList<java.util.List<EventFilterer>>;
              }
              interface FiltererComposed extends CombineTypes<[_FiltererComposed, java.lang.Object, xyz.wagyourtail.jsmacros.core.event.EventFilterer$Compound]> {}
              interface _FiltererInverted$$static extends ClassLike {
                invert(base: EventFilterer): EventFilterer;
              }
              let FiltererInverted: _FiltererInverted$$static;
              interface _FiltererInverted {
                canFilter(event: string): boolean;
                checkCyclicRef(base: EventFilterer$Compound): void;
                test(event: BaseEvent): boolean;
                readonly base: EventFilterer;
              }
              interface FiltererInverted extends CombineTypes<[_FiltererInverted, java.lang.Object, xyz.wagyourtail.jsmacros.core.event.EventFilterer$Compound]> {}
              interface _FiltererModulus$$static extends ClassLike {
                new(quotient: int): FiltererModulus;
              }
              let FiltererModulus: _FiltererModulus$$static;
              interface _FiltererModulus {
                canFilter(event: string): boolean;
                setQuotient(quotient: int): FiltererModulus;
                test(event: BaseEvent): boolean;
                count: int;
                quotient: int;
              }
              interface FiltererModulus extends CombineTypes<[_FiltererModulus, xyz.wagyourtail.jsmacros.core.event.EventFilterer, java.lang.Object]> {}
            }
            interface _BaseEvent$$static extends ClassLike {
              new(runner: Core<any,any>): BaseEvent;
            }
            let BaseEvent: _BaseEvent$$static;
            interface _BaseEvent {
              cancel(): void;
              cancellable(): boolean;
              getEventName(): string;
              isCanceled(): boolean;
              joinable(): boolean;
              trigger(): void;
              _cancelled: boolean;
              readonly runner: Core<any,any>;
            }
            interface BaseEvent extends CombineTypes<[_BaseEvent, java.lang.Object]> {}
            interface _BaseEventRegistry$$static extends ClassLike {
              new(runner: Core): BaseEventRegistry;
            }
            let BaseEventRegistry: _BaseEventRegistry$$static;
            interface _BaseEventRegistry {
              addEvent(eventName: string): void;
              addEvent(eventName: string, joinable: boolean): void;
              addEvent(eventName: string, joinable: boolean, cancellable: boolean): void;
              addEvent(clazz: java.lang.Class<BaseEvent>): void;
              addListener(event: string, listener: IEventListener): void;
              addScriptTrigger(a0: core.config.ScriptTrigger): void;
              clearMacros(): void;
              getListeners(): java.util.Map<string,java.util.Set<IEventListener>>;
              getListeners(key: string): java.util.Set<IEventListener>;
              getScriptTriggers(): java.util.List<core.config.ScriptTrigger>;
              removeListener(event: string, listener: IEventListener): boolean;
              removeListener(listener: IEventListener): boolean;
              removeScriptTrigger(a0: core.config.ScriptTrigger): boolean;
              readonly cancellableEvents: java.util.Set<string>;
              readonly events: java.util.Set<string>;
              readonly filterableEvents: java.util.Map<string,java.lang.Class<EventFilterer>>;
              readonly joinableEvents: java.util.Set<string>;
              _listeners: java.util.Map<string,java.util.Set<IEventListener>>;
              readonly oldEvents: java.util.Map<string,string>;
              _runner: Core;
            }
            interface BaseEventRegistry extends CombineTypes<[_BaseEventRegistry, java.lang.Object]> {}
            interface _BaseListener$$static extends ClassLike {
              new(trigger: core.config.ScriptTrigger, runner: Core): BaseListener;
            }
            let BaseListener: _BaseListener$$static;
            interface _BaseListener {
              equals(o: any): boolean;
              getRawTrigger(): core.config.ScriptTrigger;
              joined(): boolean;
              off(): void;
              runScript(event: BaseEvent): core.language.EventContainer<any>;
              toString(): string;
              _runner: Core;
              _trigger: core.config.ScriptTrigger;
            }
            interface BaseListener extends CombineTypes<[_BaseListener, java.lang.Object, xyz.wagyourtail.jsmacros.core.event.IEventListener]> {}
            interface _Event$$static extends ClassLike {
            }
            let Event: _Event$$static;
            interface _Event {
              cancellable(): boolean;
              filterer(): java.lang.Class<EventFilterer>;
              joinable(): boolean;
              oldName(): string;
              value(): string;
            }
            interface Event extends CombineTypes<[_Event, java.lang.annotation.Annotation, java.lang.Object]> {}
            interface _EventFilterer$$static extends ClassLike {
            }
            let EventFilterer: _EventFilterer$$static;
            interface _EventFilterer {
              canFilter(a0: string): boolean;
              test(a0: BaseEvent): boolean;
            }
            interface EventFilterer extends CombineTypes<[_EventFilterer, java.lang.Object]> {}
            interface _EventFilterer$Compound$$static extends ClassLike {
            }
            let EventFilterer$Compound: _EventFilterer$Compound$$static;
            interface _EventFilterer$Compound {
              checkCyclicRef(base: EventFilterer$Compound): void;
            }
            interface EventFilterer$Compound extends CombineTypes<[_EventFilterer$Compound, xyz.wagyourtail.jsmacros.core.event.EventFilterer, java.lang.Object]> {}
            interface _EventListener$$static extends ClassLike {
              new(macro: core.config.ScriptTrigger, runner: Core): EventListener;
            }
            let EventListener: _EventListener$$static;
            interface _EventListener {
              trigger(event: BaseEvent): core.language.EventContainer<any>;
            }
            interface EventListener extends CombineTypes<[_EventListener, xyz.wagyourtail.jsmacros.core.event.BaseListener]> {}
            interface _IEventListener$$static extends ClassLike {
              readonly NULL: IEventListener;
            }
            let IEventListener: _IEventListener$$static;
            interface _IEventListener {
              joined(): boolean;
              off(): void;
              trigger(a0: BaseEvent): core.language.EventContainer<any>;
(a0: BaseEvent): core.language.EventContainer<any>;
            }
            interface IEventListener extends CombineTypes<[_IEventListener, java.lang.Object]> {}
          }
          module extensions {
            interface _Extension$$static extends ClassLike {
              getDependenciesInternal(clazz: java.lang.Class<any>, fname: string): java.util.Set<java.net.URL>;
              getTranslationsInternal(clazz: java.lang.Class<any>, fname: string): java.util.Map<string,string>;
            }
            let Extension: _Extension$$static;
            interface _Extension {
              getDependencies(): java.util.Set<java.net.URL>;
              getExtensionName(): string;
              getTranslations(lang: string): java.util.Map<string,string>;
              init(a0: Core<any,any>): void;
              maxCoreVersion(): string;
              minCoreVersion(): string;
            }
            interface Extension extends CombineTypes<[_Extension, java.lang.Object]> {}
            interface _ExtensionClassLoader$$static extends ClassLike {
              new(urls: java.net.URL[]): ExtensionClassLoader;
            }
            let ExtensionClassLoader: _ExtensionClassLoader$$static;
            interface _ExtensionClassLoader {
              addURL(url: java.net.URL): void;
            }
            interface ExtensionClassLoader extends CombineTypes<[_ExtensionClassLoader, java.net.URLClassLoader]> {}
            interface _ExtensionLoader$$static extends ClassLike {
              new(core: Core<any,any>): ExtensionLoader;
            }
            let ExtensionLoader: _ExtensionLoader$$static;
            interface _ExtensionLoader {
              getAllExtensions(): java.util.Set<Extension>;
              getAllLanguageExtensions(): java.util.Set<LanguageExtension>;
              getAllLibraryExtensions(): java.util.Set<LibraryExtension>;
              getExtensionForFile(file: java.io.File): LanguageExtension;
              getExtensionForName(extName: string): Extension;
              getHighestPriorityExtension(): LanguageExtension;
              isExtensionLoaded(name: string): boolean;
              isGuestObject(obj: any): boolean;
              loadExtensions(): void;
              notLoaded(): boolean;
              _classLoader: ExtensionClassLoader;
              _core: Core<any,any>;
              _extPath: java.nio.file.Path;
              _extensions: java.util.Set<Extension>;
              _highestPriorityExtension: LanguageExtension;
              _languageExtensions: java.util.Set<LanguageExtension>;
              _libraryExtensions: java.util.Set<LibraryExtension>;
              _loadingDone: boolean;
            }
            interface ExtensionLoader extends CombineTypes<[_ExtensionLoader, java.lang.Object]> {}
            interface _LanguageExtension$$static extends ClassLike {
            }
            let LanguageExtension: _LanguageExtension$$static;
            interface _LanguageExtension {
              defaultFileExtension(): string;
              extensionMatch(a0: java.io.File): LanguageExtension$ExtMatch;
              getLanguage(a0: Core<any,any>): core.language.BaseLanguage<any,any>;
              getPriority(): int;
              isGuestObject(a0: any): boolean;
              wrapException(a0: java.lang.Throwable): core.language.BaseWrappedException<any>;
            }
            interface LanguageExtension extends CombineTypes<[_LanguageExtension, xyz.wagyourtail.jsmacros.core.extensions.Extension, java.lang.Object]> {}
            interface _LanguageExtension$ExtMatch$$static extends ClassLike {
              valueOf(name: string): LanguageExtension$ExtMatch;
              values(): LanguageExtension$ExtMatch[];
              readonly MATCH: LanguageExtension$ExtMatch;
              readonly MATCH_WITH_NAME: LanguageExtension$ExtMatch;
              readonly NOT_MATCH: LanguageExtension$ExtMatch;
            }
            let LanguageExtension$ExtMatch: _LanguageExtension$ExtMatch$$static;
            interface _LanguageExtension$ExtMatch {
              isMatch(): boolean;
              _match: boolean;
            }
            interface LanguageExtension$ExtMatch extends CombineTypes<[_LanguageExtension$ExtMatch]> {}
            interface _LibraryExtension$$static extends ClassLike {
            }
            let LibraryExtension: _LibraryExtension$$static;
            interface _LibraryExtension {
              getLibraries(): java.util.Set<java.lang.Class<core.library.BaseLibrary>>;
(): java.util.Set<java.lang.Class<core.library.BaseLibrary>>;
            }
            interface LibraryExtension extends CombineTypes<[_LibraryExtension, xyz.wagyourtail.jsmacros.core.extensions.Extension, java.lang.Object]> {}
          }
          module helper {
            interface _ClassWrapperTree$$static<K,V> extends ClassLike {
              new(baseType: java.lang.Class<K>, baseTypeWrapper: java.util.function.Function<K,V>): ClassWrapperTree<K,V>;
            }
            let ClassWrapperTree: _ClassWrapperTree$$static<K,V>;
            interface _ClassWrapperTree<K,V> {
              getSubtypeWrapper<T, U>(type: java.lang.Class<T>): ClassWrapperTree<T,U>;
              registerType<T, U>(type: java.lang.Class<T>, wrapper: java.util.function.Function<T,U>): void;
              wrap<T>(inputType: T): V;
              _subTypes: java.util.List<ClassWrapperTree<K,V>>;
              _type: java.lang.Class<K>;
              _wrapper: java.util.function.Function<K,V>;
            }
            interface ClassWrapperTree<K,V> extends CombineTypes<[_ClassWrapperTree<K,V>, java.lang.Object]> {}
          }
          module helpers {
            interface _BaseHelper$$static<T> extends ClassLike {
              new(base: T): BaseHelper<T>;
            }
            let BaseHelper: _BaseHelper$$static<T>;
            interface _BaseHelper<T> {
              equals(obj: any): boolean;
              getRaw(): T;
              hashCode(): int;
              _base: T;
            }
            interface BaseHelper<T> extends CombineTypes<[_BaseHelper<T>, java.lang.Object]> {}
          }
          module language {
            interface _BaseLanguage$$static<U,T> extends ClassLike {
              new(extension: core.extensions.Extension, runner: Core<any,any>): BaseLanguage<U,T>;
            }
            let BaseLanguage: _BaseLanguage$$static<U,T>;
            interface _BaseLanguage<U,T> {
              createContext(a0: core.event.BaseEvent, a1: java.io.File): T;
              _exec(a0: EventContainer<T>, a1: core.config.ScriptTrigger, a2: core.event.BaseEvent): void;
              _exec(a0: EventContainer<T>, a1: string, a2: string, a3: core.event.BaseEvent): void;
              retrieveLibs(context: T): java.util.Map<string,core.library.BaseLibrary>;
              retrieveOnceLibs(): java.util.Map<string,core.library.BaseLibrary>;
              retrievePerExecLibs(context: T): java.util.Map<string,core.library.BaseLibrary>;
              trigger(macro: core.config.ScriptTrigger, event: core.event.BaseEvent, then: java.lang.Runnable, catcher: java.util.function.Consumer<java.lang.Throwable>): EventContainer<T>;
              trigger(lang: string, script: string, fakeFile: java.io.File, event: core.event.BaseEvent, then: java.lang.Runnable, catcher: java.util.function.Consumer<java.lang.Throwable>): EventContainer<T>;
              readonly extension: core.extensions.Extension;
              preThread: java.lang.Runnable;
              _runner: Core<any,any>;
            }
            interface BaseLanguage<U,T> extends CombineTypes<[_BaseLanguage<U,T>, java.lang.Object]> {}
            interface _BaseScriptContext$$static<T> extends ClassLike {
              new(runner: Core<any,any>, event: core.event.BaseEvent, file: java.io.File): BaseScriptContext<T>;
            }
            let BaseScriptContext: _BaseScriptContext$$static<T>;
            interface _BaseScriptContext<T> {
              bindEvent(th: java.lang.Thread, event: EventContainer<BaseScriptContext<T>>): void;
              bindThread(t: java.lang.Thread): boolean;
              clearSyncObject(): void;
              closeContext(): void;
              getBoundEvents(): java.util.Map<java.lang.Thread,EventContainer<BaseScriptContext<T>>>;
              getBoundThreads(): java.util.Set<java.lang.Thread>;
              getContainedFolder(): java.io.File;
              getContext(): T;
              getFile(): java.io.File;
              getMainThread(): java.lang.Thread;
              getSyncObject(): any;
              getTriggeringEvent(): core.event.BaseEvent;
              isContextClosed(): boolean;
              isMultiThreaded(): boolean;
(): boolean;
              releaseBoundEventIfPresent(thread: java.lang.Thread): boolean;
              setContext(context: T): void;
              setMainThread(t: java.lang.Thread): void;
              shouldKeepAlive(): boolean;
              unbindThread(t: java.lang.Thread): void;
              wrapSleep(sleep: BaseScriptContext$SleepRunnable): void;
              _closed: boolean;
              _context: T;
              readonly eventListeners: java.util.WeakHashMap<core.event.IEventListener,string>;
              _events: java.util.Map<java.lang.Thread,EventContainer<BaseScriptContext<T>>>;
              hasMethodWrapperBeenInvoked: boolean;
              _mainFile: java.io.File;
              _mainThread: java.lang.Thread;
              readonly runner: Core<any,any>;
              readonly startTime: long;
              readonly syncObject: java.lang.ref.WeakReference<any>;
              _syncObjectPrivate: any;
              _threads: java.util.Set<java.lang.Thread>;
              readonly triggeringEvent: core.event.BaseEvent;
            }
            interface BaseScriptContext<T> extends CombineTypes<[_BaseScriptContext<T>, java.lang.Object]> {}
            interface _BaseScriptContext$ScriptAssertionError$$static extends ClassLike {
              new(message: string): BaseScriptContext$ScriptAssertionError;
            }
            let BaseScriptContext$ScriptAssertionError: _BaseScriptContext$ScriptAssertionError$$static;
            interface _BaseScriptContext$ScriptAssertionError {
            }
            interface BaseScriptContext$ScriptAssertionError extends CombineTypes<[_BaseScriptContext$ScriptAssertionError, java.lang.AssertionError]> {}
            interface _BaseScriptContext$SleepRunnable$$static extends ClassLike {
            }
            let BaseScriptContext$SleepRunnable: _BaseScriptContext$SleepRunnable$$static;
            interface _BaseScriptContext$SleepRunnable {
              run(): void;
(): void;
            }
            interface BaseScriptContext$SleepRunnable extends CombineTypes<[_BaseScriptContext$SleepRunnable, java.lang.Object]> {}
            interface _BaseWrappedException$$static<T> extends ClassLike {
              _unQualifyClassName(name: string): string;
              wrapHostElement(t: java.lang.StackTraceElement, next: BaseWrappedException<any>): BaseWrappedException<java.lang.StackTraceElement>;
              new(exception: T, message: string, location: BaseWrappedException$SourceLocation, next: BaseWrappedException<any>): BaseWrappedException<T>;
            }
            let BaseWrappedException: _BaseWrappedException$$static<T>;
            interface _BaseWrappedException<T> {
              readonly location: BaseWrappedException$SourceLocation;
              readonly message: string;
              readonly next: BaseWrappedException<any>;
              readonly stackFrame: T;
            }
            interface BaseWrappedException<T> extends CombineTypes<[_BaseWrappedException<T>, java.lang.Object]> {}
            interface _BaseWrappedException$GuestLocation$$static extends ClassLike {
              new(file: java.io.File, startIndex: int, endIndex: int, line: int, column: int): BaseWrappedException$GuestLocation;
            }
            let BaseWrappedException$GuestLocation: _BaseWrappedException$GuestLocation$$static;
            interface _BaseWrappedException$GuestLocation {
              toString(): string;
              readonly column: int;
              readonly endIndex: int;
              readonly file: java.io.File;
              readonly line: int;
              readonly startIndex: int;
            }
            interface BaseWrappedException$GuestLocation extends CombineTypes<[_BaseWrappedException$GuestLocation, xyz.wagyourtail.jsmacros.core.language.BaseWrappedException$SourceLocation]> {}
            interface _BaseWrappedException$HostLocation$$static extends ClassLike {
              new(location: string): BaseWrappedException$HostLocation;
            }
            let BaseWrappedException$HostLocation: _BaseWrappedException$HostLocation$$static;
            interface _BaseWrappedException$HostLocation {
              toString(): string;
              readonly location: string;
            }
            interface BaseWrappedException$HostLocation extends CombineTypes<[_BaseWrappedException$HostLocation, xyz.wagyourtail.jsmacros.core.language.BaseWrappedException$SourceLocation]> {}
            interface _BaseWrappedException$SourceLocation$$static extends ClassLike {
              new(): BaseWrappedException$SourceLocation;
            }
            let BaseWrappedException$SourceLocation: _BaseWrappedException$SourceLocation$$static;
            interface _BaseWrappedException$SourceLocation {
            }
            interface BaseWrappedException$SourceLocation extends CombineTypes<[_BaseWrappedException$SourceLocation, java.lang.Object]> {}
            interface _EventContainer$$static<T> extends ClassLike {
              new(ctx: T): EventContainer<T>;
            }
            let EventContainer: _EventContainer$$static<T>;
            interface _EventContainer<T> {
              awaitLock(then: java.lang.Runnable): void;
              getCtx(): T;
              getLockThread(): java.lang.Thread;
              isLocked(): boolean;
              releaseLock(): void;
              setLockThread(lockThread: java.lang.Thread): void;
              toString(): string;
              _ctx: T;
              _lockThread: java.lang.Thread;
              _locked: boolean;
              _then: java.util.List<java.lang.Runnable>;
            }
            interface EventContainer<T> extends CombineTypes<[_EventContainer<T>, java.lang.Object]> {}
          }
          module library {
            module impl {
              module classes {
                module proxypackage {
                  interface _Neighbor$$static extends ClassLike {
                    new(): Neighbor;
                  }
                  let Neighbor: _Neighbor$$static;
                  interface _Neighbor {
                  }
                  interface Neighbor extends CombineTypes<[_Neighbor, java.lang.Object]> {}
                }
                interface _ClassBuilder$$static<T> extends ClassLike {
                  readonly methodWrappers: java.util.Map<string,MethodWrapper<any,any,any,any>>;
                  new(name: string, parent: java.lang.Class<T>, interfaces: java.lang.Class<any>[]): ClassBuilder<T>;
                  new(name: string, parent: java.lang.Class<T>, ...interfaces: java.lang.Class<any>[]): ClassBuilder<T>;
                }
                let ClassBuilder: _ClassBuilder$$static<T>;
                interface _ClassBuilder<T> {
                  addAnnotation(type: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<ClassBuilder<T>>;
                  addClinit(): ClassBuilder$ConstructorBuilder;
                  addConstructor(params: java.lang.Class<any>[]): ClassBuilder$ConstructorBuilder;
                  addConstructor(...params: java.lang.Class<any>[]): ClassBuilder$ConstructorBuilder;
                  addConstructor(code: string): ClassBuilder<T>;
                  addField(fieldType: java.lang.Class<any>, name: string): ClassBuilder$FieldBuilder;
                  addField(code: string): ClassBuilder<T>;
                  addMethod(returnType: java.lang.Class<any>, name: string, params: java.lang.Class<any>[]): ClassBuilder$MethodBuilder;
                  addMethod(returnType: java.lang.Class<any>, name: string, ...params: java.lang.Class<any>[]): ClassBuilder$MethodBuilder;
                  addMethod(code: string): ClassBuilder<T>;
                  finishBuildAndFreeze(): java.lang.Class<T>;
                  _classAnnotations: javassist.bytecode.AnnotationsAttribute;
                  _className: string;
                  readonly ctClass: javassist.CtClass;
                  _defaultPool: javassist.ClassPool;
                  _invisibleClassAnnotations: javassist.bytecode.AnnotationsAttribute;
                }
                interface ClassBuilder<T> extends CombineTypes<[_ClassBuilder<T>, java.lang.Object]> {}
                interface _ClassBuilder$AnnotationBuilder$$static<T> extends ClassLike {
                }
                let ClassBuilder$AnnotationBuilder: _ClassBuilder$AnnotationBuilder$$static<T>;
                interface _ClassBuilder$AnnotationBuilder<T> {
                  finish(): T;
                  putAnnotation(key: string, annotationClass: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<ClassBuilder$AnnotationBuilder<T>>;
                  putArray(key: string): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<ClassBuilder$AnnotationBuilder<T>>;
                  putBoolean(key: string, value: boolean): ClassBuilder$AnnotationBuilder<T>;
                  putByte(key: string, value: byte): ClassBuilder$AnnotationBuilder<T>;
                  putChar(key: string, value: char): ClassBuilder$AnnotationBuilder<T>;
                  putClass(key: string, value: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<T>;
                  putDouble(key: string, value: double): ClassBuilder$AnnotationBuilder<T>;
                  putEnum(key: string, value: java.lang.Enum<any>): ClassBuilder$AnnotationBuilder<T>;
                  putFloat(key: string, value: double): ClassBuilder$AnnotationBuilder<T>;
                  putInt(key: string, value: int): ClassBuilder$AnnotationBuilder<T>;
                  putLong(key: string, value: long): ClassBuilder$AnnotationBuilder<T>;
                  putShort(key: string, value: short): ClassBuilder$AnnotationBuilder<T>;
                  putString(key: string, value: string): ClassBuilder$AnnotationBuilder<T>;
                  _annotationInstance: javassist.bytecode.annotation.Annotation;
                  _attr: javassist.bytecode.AnnotationsAttribute;
                  _constPool: javassist.bytecode.ConstPool;
                  _member: T;
                  _this$0: ClassBuilder;
                }
                interface ClassBuilder$AnnotationBuilder<T> extends CombineTypes<[_ClassBuilder$AnnotationBuilder<T>, java.lang.Object]> {}
                interface _ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder$$static<U> extends ClassLike {
                  new(this$1: U, parent: javassist.bytecode.ConstPool): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                }
                let ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder: _ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder$$static<U>;
                interface _ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U> {
                  finish(): U;
                  putAnnotation(annotationClass: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>>;
                  putArray(annotationClass: java.lang.Class<any>): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>>;
                  putBoolean(value: boolean): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putByte(value: byte): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putChar(value: char): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putClass(value: java.lang.Class<any>): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putDouble(value: double): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putEnum(value: java.lang.Enum<any>): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putFloat(value: double): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putInt(value: int): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putLong(value: long): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putShort(value: short): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  putString(value: string): ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>;
                  _arrayMemberValue: javassist.bytecode.annotation.ArrayMemberValue;
                  _constPool: javassist.bytecode.ConstPool;
                  _mv: java.util.List<javassist.bytecode.annotation.MemberValue>;
                  _parent: U;
                  _this$1: ClassBuilder$AnnotationBuilder;
                }
                interface ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U> extends CombineTypes<[_ClassBuilder$AnnotationBuilder$AnnotationArrayBuilder<U>, java.lang.Object]> {}
                interface _ClassBuilder$BodyBuilder$$static extends ClassLike {
                }
                let ClassBuilder$BodyBuilder: _ClassBuilder$BodyBuilder$$static;
                interface _ClassBuilder$BodyBuilder {
                  appendGuestCode(code: MethodWrapper<any,any,any,any>, argsAsObjects: string, tokenBefore: string): ClassBuilder$BodyBuilder;
                  appendJavaCode(code: string): ClassBuilder$BodyBuilder;
                  finish(): ClassBuilder<T>;
                  _body: classes$stringBuilder;
                  _ctBehavior: javassist.CtBehavior;
                  _guestCount: int;
                  _guestName: string;
                  _this$0: ClassBuilder;
                }
                interface ClassBuilder$BodyBuilder extends CombineTypes<[_ClassBuilder$BodyBuilder, java.lang.Object]> {}
                interface _ClassBuilder$ConstructorBuilder$$static extends ClassLike {
                  new(this$0: ClassBuilder, params: javassist.CtClass[], clInit: boolean): ClassBuilder$ConstructorBuilder;
                }
                let ClassBuilder$ConstructorBuilder: _ClassBuilder$ConstructorBuilder$$static;
                interface _ClassBuilder$ConstructorBuilder {
                  body(code_src: string): ClassBuilder<T>;
                  body(buildBody: MethodWrapper<javassist.CtClass,javassist.CtBehavior,any,any>): ClassBuilder<T>;
                  buildBody(): ClassBuilder$BodyBuilder;
                  endAbstract(): ClassBuilder<T>;
                  guestBody(methodBody: MethodWrapper<any,any,any,any>): ClassBuilder<T>;
                  _this$0: ClassBuilder;
                }
                interface ClassBuilder$ConstructorBuilder extends CombineTypes<[_ClassBuilder$ConstructorBuilder, classes$MethodBuilder]> {}
                interface _ClassBuilder$FieldBuilder$$static extends ClassLike {
                  new(this$0: ClassBuilder, fieldType: javassist.CtClass, name: string): ClassBuilder$FieldBuilder;
                }
                let ClassBuilder$FieldBuilder: _ClassBuilder$FieldBuilder$$static;
                interface _ClassBuilder$FieldBuilder {
                  addAnnotation(type: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<ClassBuilder$FieldBuilder>;
                  compile(code: string): ClassBuilder<T>;
                  end(): ClassBuilder<T>;
                  getModString(): string;
                  getMods(): int;
                  initializer(): ClassBuilder$FieldBuilder$FieldInitializerBuilder;
                  makePackagePrivate(): ClassBuilder$FieldBuilder;
                  makePrivate(): ClassBuilder$FieldBuilder;
                  makeProtected(): ClassBuilder$FieldBuilder;
                  makePublic(): ClassBuilder$FieldBuilder;
                  rename(name: string): ClassBuilder$FieldBuilder;
                  toggleFinal(): ClassBuilder$FieldBuilder;
                  toggleStatic(): ClassBuilder$FieldBuilder;
                  _fieldAnnotations: javassist.bytecode.AnnotationsAttribute;
                  fieldInitializer: javassist.CtField$Initializer;
                  _fieldMods: int;
                  _fieldName: string;
                  _fieldType: javassist.CtClass;
                  _invisibleFieldAnnotations: javassist.bytecode.AnnotationsAttribute;
                  _this$0: ClassBuilder;
                }
                interface ClassBuilder$FieldBuilder extends CombineTypes<[_ClassBuilder$FieldBuilder, java.lang.Object]> {}
                interface _ClassBuilder$FieldBuilder$FieldInitializerBuilder$$static extends ClassLike {
                  new(this$1: ClassBuilder$FieldBuilder): ClassBuilder$FieldBuilder$FieldInitializerBuilder;
                }
                let ClassBuilder$FieldBuilder$FieldInitializerBuilder: _ClassBuilder$FieldBuilder$FieldInitializerBuilder$$static;
                interface _ClassBuilder$FieldBuilder$FieldInitializerBuilder {
                  callStaticMethod(clazz: java.lang.Class<any>, methodName: string, code_arg: string[]): ClassBuilder$FieldBuilder;
                  callStaticMethod(clazz: java.lang.Class<any>, methodName: string, ...code_arg: string[]): ClassBuilder$FieldBuilder;
                  callStaticMethodInThisClass(methodName: string, code_arg: string[]): ClassBuilder$FieldBuilder;
                  callStaticMethodInThisClass(methodName: string, ...code_arg: string[]): ClassBuilder$FieldBuilder;
                  compile(code: string): ClassBuilder$FieldBuilder;
                  initClass(clazz: java.lang.Class<any>, code_arg: string[]): ClassBuilder$FieldBuilder;
                  initClass(clazz: java.lang.Class<any>, ...code_arg: string[]): ClassBuilder$FieldBuilder;
                  setBoolean(value: boolean): ClassBuilder$FieldBuilder;
                  setByte(value: byte): ClassBuilder$FieldBuilder;
                  setChar(value: char): ClassBuilder$FieldBuilder;
                  setDouble(value: double): ClassBuilder$FieldBuilder;
                  setFloat(value: double): ClassBuilder$FieldBuilder;
                  setInt(value: int): ClassBuilder$FieldBuilder;
                  setLong(value: long): ClassBuilder$FieldBuilder;
                  setShort(value: short): ClassBuilder$FieldBuilder;
                  setString(value: string): ClassBuilder$FieldBuilder;
                  _this$1: ClassBuilder$FieldBuilder;
                }
                interface ClassBuilder$FieldBuilder$FieldInitializerBuilder extends CombineTypes<[_ClassBuilder$FieldBuilder$FieldInitializerBuilder, java.lang.Object]> {}
                interface _ClassBuilder$MethodBuilder$$static extends ClassLike {
                  new(this$0: ClassBuilder, methodReturnType: javassist.CtClass, methodName: string, params: javassist.CtClass[]): ClassBuilder$MethodBuilder;
                  new(this$0: ClassBuilder, methodReturnType: javassist.CtClass, methodName: string, ...params: javassist.CtClass[]): ClassBuilder$MethodBuilder;
                }
                let ClassBuilder$MethodBuilder: _ClassBuilder$MethodBuilder$$static;
                interface _ClassBuilder$MethodBuilder {
                  addAnnotation(type: java.lang.Class<any>): ClassBuilder$AnnotationBuilder<ClassBuilder$MethodBuilder>;
                  body(code_src: string): ClassBuilder<T>;
                  body(buildBody: MethodWrapper<javassist.CtClass,javassist.CtBehavior,any,any>): ClassBuilder<T>;
                  buildBody(): ClassBuilder$BodyBuilder;
                  compile(code: string): ClassBuilder<T>;
                  endAbstract(): ClassBuilder<T>;
                  exceptions(exceptions: java.lang.Class<any>[]): ClassBuilder$MethodBuilder;
                  exceptions(...exceptions: java.lang.Class<any>[]): ClassBuilder$MethodBuilder;
                  guestBody(methodBody: MethodWrapper<any,any,any,any>): ClassBuilder<T>;
                  makePackagePrivate(): ClassBuilder$MethodBuilder;
                  makePrivate(): ClassBuilder$MethodBuilder;
                  makeProtected(): ClassBuilder$MethodBuilder;
                  makePublic(): ClassBuilder$MethodBuilder;
                  rename(newName: string): ClassBuilder$MethodBuilder;
                  toggleStatic(): ClassBuilder$MethodBuilder;
                  _exceptions: javassist.CtClass[];
                  _invisibleMethodAnnotations: javassist.bytecode.AnnotationsAttribute;
                  _methodAnnotations: javassist.bytecode.AnnotationsAttribute;
                  _methodMods: int;
                  _methodName: string;
                  _methodReturnType: javassist.CtClass;
                  _params: javassist.CtClass[];
                  _this$0: ClassBuilder;
                }
                interface ClassBuilder$MethodBuilder extends CombineTypes<[_ClassBuilder$MethodBuilder, java.lang.Object]> {}
                interface _FileHandler$$static extends ClassLike {
                  new(path: string): FileHandler;
                  new(path: string, charset: string): FileHandler;
                  new(path: java.io.File, charset: string): FileHandler;
                  new(path: string, charset: java.nio.charset.Charset): FileHandler;
                  new(path: java.io.File): FileHandler;
                  new(path: java.io.File, charset: java.nio.charset.Charset): FileHandler;
                }
                let FileHandler: _FileHandler$$static;
                interface _FileHandler {
                  append(s: string): FileHandler;
                  append(b: byte[]): FileHandler;
                  getFile(): java.io.File;
                  read(): string;
                  readBytes(): byte[];
                  readLines(): FileHandler$FileLineIterator;
                  streamBytes(): java.io.BufferedInputStream;
                  toString(): string;
                  write(s: string): FileHandler;
                  write(b: byte[]): FileHandler;
                  _charset: java.nio.charset.Charset;
                  _f: java.io.File;
                }
                interface FileHandler extends CombineTypes<[_FileHandler, java.lang.Object]> {}
                interface _FileHandler$FileLineIterator$$static extends ClassLike {
                  _CLEANER: java.lang.ref.Cleaner;
                  new(file: java.io.File, charset: java.nio.charset.Charset): FileHandler$FileLineIterator;
                }
                let FileHandler$FileLineIterator: _FileHandler$FileLineIterator$$static;
                interface _FileHandler$FileLineIterator {
                  close(): void;
                  hasNext(): boolean;
                  next(): string;
                  next(): any;
                  _nextLine: string;
                  _reader: java.io.BufferedReader;
                }
                interface FileHandler$FileLineIterator extends CombineTypes<[_FileHandler$FileLineIterator, java.lang.Object, java.lang.AutoCloseable, java.util.Iterator<string>]> {}
                interface _HTTPRequest$$static extends ClassLike {
                  _gson: com.google.gson.Gson;
                  new(url: string): HTTPRequest;
                }
                let HTTPRequest: _HTTPRequest$$static;
                interface _HTTPRequest {
                  addHeader(key: string, value: string): HTTPRequest;
                  get(): HTTPRequest$Response;
                  post(data: string): HTTPRequest$Response;
                  post(data: byte[]): HTTPRequest$Response;
                  put(data: string): HTTPRequest$Response;
                  put(data: byte[]): HTTPRequest$Response;
                  send(method: string): HTTPRequest$Response;
                  send(method: string, data: string): HTTPRequest$Response;
                  send(method: string, data: byte[]): HTTPRequest$Response;
                  setConnectTimeout(timeout: int): HTTPRequest;
                  setReadTimeout(timeout: int): HTTPRequest;
                  conn: java.net.URL;
                  connectTimeout: int;
                  headers: java.util.Map<string,string>;
                  readTimeout: int;
                }
                interface HTTPRequest extends CombineTypes<[_HTTPRequest, java.lang.Object]> {}
                interface _HTTPRequest$Response$$static extends ClassLike {
                  new(inputStream: java.io.InputStream, responseCode: int, headers: java.util.Map<string,java.util.List<string>>): HTTPRequest$Response;
                }
                let HTTPRequest$Response: _HTTPRequest$Response$$static;
                interface _HTTPRequest$Response {
                  byteArray(): byte[];
                  json(): any;
                  text(): string;
                  headers: java.util.Map<string,java.util.List<string>>;
                  _raw: java.io.InputStream;
                  responseCode: int;
                  _text: string;
                }
                interface HTTPRequest$Response extends CombineTypes<[_HTTPRequest$Response, java.lang.Object]> {}
                interface _LibraryBuilder$$static extends ClassLike {
                  new(runner: Core<any,any>, name: string, perExec: boolean, allowedLangs: string[]): LibraryBuilder;
                  new(runner: Core<any,any>, name: string, perExec: boolean, ...allowedLangs: string[]): LibraryBuilder;
                }
                let LibraryBuilder: _LibraryBuilder$$static;
                interface _LibraryBuilder {
                  addConstructor(): ClassBuilder$ConstructorBuilder;
                  finishBuildAndFreeze(): java.lang.Class<BaseLibrary>;
                  _hasConstructorSet: boolean;
                  _languages: boolean;
                  _perExec: boolean;
                  _runner: Core<any,any>;
                }
                interface LibraryBuilder extends CombineTypes<[_LibraryBuilder, ClassBuilder<BaseLibrary>]> {}
                interface _ProxyBuilder$$static<T> extends ClassLike {
                  _areParamsCompatible(fuzzable: java.lang.Class<any>[], target: java.lang.Class<any>[]): boolean;
                  _boxPrimitive(primitive: java.lang.Class<any>): java.lang.Class<any>;
                  _getPrimitive(c: char): java.lang.Class<any>;
                  _sigPart: java.util.regex.Pattern;
                  new(clazz: java.lang.Class<T>, interfaces: java.lang.Class<any>[]): ProxyBuilder<T>;
                }
                let ProxyBuilder: _ProxyBuilder$$static<T>;
                interface _ProxyBuilder<T> {
                  addMethod(methodNameOrSig: string, proxyMethod: MethodWrapper<ProxyBuilder$ProxyReference<T>,any[],any,any>): ProxyBuilder<T>;
                  buildInstance(constructorArgs: any[]): T;
                  buildInstance(constructorSig: string, constructorArgs: any[]): T;
                  buildInstance(constructorSig: java.lang.Class<any>[], constructorArgs: any[]): T;
                  _getWrapperForMethod(m: java.lang.reflect.Method): MethodWrapper<ProxyBuilder$ProxyReference<T>,any[],any,any>;
                  _invoke(self: any, thisMethod: java.lang.reflect.Method, proceed: java.lang.reflect.Method, args: any[]): any;
                  _mapMethodSig(methodSig: string): ProxyBuilder$MethodSigParts;
                  _methodToSigParts(mthd: java.lang.reflect.Method): ProxyBuilder$MethodSigParts;
                  readonly factory: javassist.util.proxy.ProxyFactory;
                  readonly proxiedMethodDefaults: java.util.Map<string,MethodWrapper<ProxyBuilder$ProxyReference<T>,any[],any,any>>;
                  readonly proxiedMethods: java.util.Map<ProxyBuilder$MethodSigParts,MethodWrapper<ProxyBuilder$ProxyReference<T>,any[],any,any>>;
                }
                interface ProxyBuilder<T> extends CombineTypes<[_ProxyBuilder<T>, java.lang.Object]> {}
                interface _ProxyBuilder$MethodSigParts$$static extends ClassLike {
                  _new(name: string, params: java.lang.Class<any>[], returnType: java.lang.Class<any>): ProxyBuilder$MethodSigParts;
                }
                let ProxyBuilder$MethodSigParts: _ProxyBuilder$MethodSigParts$$static;
                interface _ProxyBuilder$MethodSigParts {
                  equals(o: any): boolean;
                  hashCode(): int;
                  readonly name: string;
                  readonly params: java.lang.Class<any>[];
                  readonly returnType: java.lang.Class<any>;
                }
                interface ProxyBuilder$MethodSigParts extends CombineTypes<[_ProxyBuilder$MethodSigParts, java.lang.Object]> {}
                interface _ProxyBuilder$ProxyReference$$static<T> extends ClassLike {
                  new(self: T, parent: java.util.function.Function<any[],any>): ProxyBuilder$ProxyReference<T>;
                }
                let ProxyBuilder$ProxyReference: _ProxyBuilder$ProxyReference$$static<T>;
                interface _ProxyBuilder$ProxyReference<T> {
                  readonly parent: java.util.function.Function<any[],any>;
                  readonly self: T;
                }
                interface ProxyBuilder$ProxyReference<T> extends CombineTypes<[_ProxyBuilder$ProxyReference<T>, java.lang.Object]> {}
                interface _Websocket$$static extends ClassLike {
                  new(address: string): Websocket;
                  new(address: java.net.URL): Websocket;
                }
                let Websocket: _Websocket$$static;
                interface _Websocket {
                  close(): Websocket;
                  close(closeCode: int): Websocket;
                  connect(): Websocket;
                  getWs(): com.neovisionaries.ws.client.WebSocket;
                  sendText(text: string): Websocket;
                  onConnect: MethodWrapper<com.neovisionaries.ws.client.WebSocket,java.util.Map<string,java.util.List<string>>,any,any>;
                  onDisconnect: MethodWrapper<com.neovisionaries.ws.client.WebSocket,Websocket$Disconnected,any,any>;
                  onError: MethodWrapper<com.neovisionaries.ws.client.WebSocket,com.neovisionaries.ws.client.WebSocketException,any,any>;
                  onFrame: MethodWrapper<com.neovisionaries.ws.client.WebSocket,com.neovisionaries.ws.client.WebSocketFrame,any,any>;
                  onTextMessage: MethodWrapper<com.neovisionaries.ws.client.WebSocket,string,any,any>;
                  _ws: com.neovisionaries.ws.client.WebSocket;
                }
                interface Websocket extends CombineTypes<[_Websocket, java.lang.Object]> {}
                interface _Websocket$Disconnected$$static extends ClassLike {
                  new(serverFrame: com.neovisionaries.ws.client.WebSocketFrame, clientFrame: com.neovisionaries.ws.client.WebSocketFrame, isServer: boolean): Websocket$Disconnected;
                }
                let Websocket$Disconnected: _Websocket$Disconnected$$static;
                interface _Websocket$Disconnected {
                  clientFrame: com.neovisionaries.ws.client.WebSocketFrame;
                  isServer: boolean;
                  serverFrame: com.neovisionaries.ws.client.WebSocketFrame;
                }
                interface Websocket$Disconnected extends CombineTypes<[_Websocket$Disconnected, java.lang.Object]> {}
                interface _WrappedScript$$static<T,U,V> extends ClassLike {
                  new(runner: Core<any,any>, f: java.util.function.Function<core.event.BaseEvent,core.language.EventContainer<core.language.BaseScriptContext<any>>>, _async: boolean): WrappedScript<T,U,V>;
                }
                let WrappedScript: _WrappedScript$$static<T,U,V>;
                interface _WrappedScript<T,U,V> {
                  accept(t: T): void;
                  accept(t: T, u: U): void;
                  apply(t: T): V;
                  apply(t: T, u: U): V;
                  compare(o1: T, o2: T): int;
                  get(): V;
                  run(): void;
                  test(t: T): boolean;
                  test(t: T, u: U): boolean;
                  readonly _async: boolean;
                  readonly f: java.util.function.Function<core.event.BaseEvent,core.language.EventContainer<core.language.BaseScriptContext<any>>>;
                  _runner: Core<any,any>;
                }
                interface WrappedScript<T,U,V> extends CombineTypes<[_WrappedScript<T,U,V>, MethodWrapper<T,U,V,core.language.BaseScriptContext<any>>]> {}
              }
              interface _FFS$$static extends ClassLike {
                new(context: core.language.BaseScriptContext<any>): FFS;
              }
              let FFS: _FFS$$static;
              interface _FFS {
                combine(patha: string, pathb: string): string;
                copy(from: string, to: string): void;
                createFile(path: string, name: string): boolean;
                createFile(path: string, name: string, createDirs: boolean): boolean;
                exists(path: string): boolean;
                getDir(path: string): string;
                getName(path: string): string;
                getRawAttributes(path: string): java.nio.file.attribute.BasicFileAttributes;
                isDir(path: string): boolean;
                isFile(path: string): boolean;
                list(path: string): string[];
                makeDir(path: string): boolean;
                move(from: string, to: string): void;
                open(path: string): impl.classes.FileHandler;
                open(path: string, charset: string): impl.classes.FileHandler;
                toRawFile(path: string): java.io.File;
                toRawPath(path: string): java.nio.file.Path;
                toRelativePath(absolutePath: string): string;
                unlink(path: string): boolean;
                walkFiles(path: string, maxDepth: int, followLinks: boolean, visitor: MethodWrapper<string,java.nio.file.attribute.BasicFileAttributes,any,any>): void;
              }
              interface FFS extends CombineTypes<[_FFS, xyz.wagyourtail.jsmacros.core.library.PerExecLibrary]> {}
              interface _FGlobalVars$$static extends ClassLike {
                new(runner: Core<any,any>): FGlobalVars;
              }
              let FGlobalVars: _FGlobalVars$$static;
              interface _FGlobalVars {
                decrementAndGetInt(name: string): int;
                getAndDecrementInt(name: string): int;
                getAndIncrementInt(name: string): int;
                getBoolean(name: string): boolean;
                getDouble(name: string): double;
                getInt(name: string): int;
                getObject(name: string): any;
                getRaw(): java.util.Map<string,any>;
                getString(name: string): string;
                getType(name: string): string;
                incrementAndGetInt(name: string): int;
                putBoolean(name: string, b: boolean): boolean;
                putDouble(name: string, d: double): double;
                putInt(name: string, i: int): int;
                putObject(name: string, o: any): any;
                putString(name: string, str: string): string;
                remove(key: string): void;
                toggleBoolean(name: string): boolean;
                globalRaw: java.util.Map<string,any>;
              }
              interface FGlobalVars extends CombineTypes<[_FGlobalVars, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
              interface _FJsMacros$$static extends ClassLike {
                new(context: core.language.BaseScriptContext<any>): FJsMacros;
              }
              let FJsMacros: _FJsMacros$$static;
              interface _FJsMacros {
                assertEvent(event: core.event.BaseEvent, type: string): void;
                createComposedEventFilterer(initial: core.event.EventFilterer): core.event.impl.FiltererComposed;
                createCustomEvent(eventName: string): core.event.impl.EventCustom;
                createEventFilterer(event: string): core.event.EventFilterer;
                createModulusEventFilterer(quotient: int): core.event.impl.FiltererModulus;
                disableAllListeners(event: string): void;
                disableAllListeners(): void;
                disableScriptListeners(event: string): void;
                disableScriptListeners(): void;
                getConfig(): core.config.ConfigManager;
                getOpenContexts(): java.util.List<core.language.BaseScriptContext<any>>;
                getProfile(): core.config.BaseProfile;
                getServiceManager(): core.service.ServiceManager;
                invertEventFilterer(base: core.event.EventFilterer): core.event.EventFilterer;
                listeners(event: string): java.util.List<core.event.IEventListener>;
                off(listener: core.event.IEventListener): boolean;
                off(event: string, listener: core.event.IEventListener): boolean;
                on(event: string, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                on(event: string, joined: boolean, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                on(event: string, filterer: core.event.EventFilterer, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                on(event: string, filterer: core.event.EventFilterer, joined: boolean, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                once(event: string, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                once(event: string, joined: boolean, callback: MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>): core.event.IEventListener;
                open(path: string): void;
                openUrl(url: string): void;
                _openUrl(url: java.net.URL): void;
                runScript(file: string): core.language.EventContainer<any>;
                runScript(file: string, fakeEvent: core.event.BaseEvent): core.language.EventContainer<any>;
                runScript(file: string, fakeEvent: core.event.BaseEvent, callback: MethodWrapper<java.lang.Throwable,any,any,any>): core.language.EventContainer<any>;
                runScript(language: string, script: string): core.language.EventContainer<any>;
                runScript(language: string, script: string, callback: MethodWrapper<java.lang.Throwable,any,any,any>): core.language.EventContainer<any>;
                runScript(language: string, script: string, file: string, callback: MethodWrapper<java.lang.Throwable,any,any,any>): core.language.EventContainer<any>;
                runScript(language: string, script: string, file: string, event: core.event.BaseEvent, callback: MethodWrapper<java.lang.Throwable,any,any,any>): core.language.EventContainer<any>;
                waitForEvent(event: string): FJsMacros$EventAndContext<any>;
                waitForEvent(event: string, join: boolean): FJsMacros$EventAndContext<any>;
                waitForEvent(event: string, filter: MethodWrapper<core.event.BaseEvent,any,boolean,any>): FJsMacros$EventAndContext<any>;
                waitForEvent(event: string, join: boolean, filter: MethodWrapper<core.event.BaseEvent,any,boolean,any>): FJsMacros$EventAndContext<any>;
                waitForEvent(event: string, filter: MethodWrapper<core.event.BaseEvent,any,boolean,any>, runBeforeWaiting: MethodWrapper<any,any,any,any>): FJsMacros$EventAndContext<any>;
                waitForEvent(event: string, join: boolean, filter: MethodWrapper<core.event.BaseEvent,any,boolean,any>, runBeforeWaiting: MethodWrapper<any,any,any,any>): FJsMacros$EventAndContext<any>;
                wrapScriptRun<T, U, R>(file: string): MethodWrapper<T,U,R,any>;
                wrapScriptRun<T, U, R>(language: string, script: string): MethodWrapper<T,U,R,any>;
                wrapScriptRun<T, U, R>(language: string, script: string, file: string): MethodWrapper<T,U,R,any>;
                wrapScriptRunAsync<T, U, R>(file: string): MethodWrapper<T,U,R,any>;
                wrapScriptRunAsync<T, U, R>(language: string, script: string): MethodWrapper<T,U,R,any>;
                wrapScriptRunAsync<T, U, R>(language: string, script: string, file: string): MethodWrapper<T,U,R,any>;
              }
              interface FJsMacros extends CombineTypes<[_FJsMacros, xyz.wagyourtail.jsmacros.core.library.PerExecLibrary]> {}
              interface _FJsMacros$EventAndContext$$static<E> extends ClassLike {
                new(event: E, context: core.language.EventContainer<any>): FJsMacros$EventAndContext<E>;
              }
              let FJsMacros$EventAndContext: _FJsMacros$EventAndContext$$static<E>;
              interface _FJsMacros$EventAndContext<E> {
                toString(): string;
                readonly context: core.language.EventContainer<any>;
                readonly event: E;
              }
              interface FJsMacros$EventAndContext<E> extends CombineTypes<[_FJsMacros$EventAndContext<E>, java.lang.Object]> {}
              interface _FJsMacros$ScriptEventListener$$static extends ClassLike {
              }
              let FJsMacros$ScriptEventListener: _FJsMacros$ScriptEventListener$$static;
              interface _FJsMacros$ScriptEventListener {
                getCreatorName(): string;
                getCtx(): core.language.BaseScriptContext<any>;
                getWrapper(): MethodWrapper<core.event.BaseEvent,core.language.EventContainer<any>,any,any>;
              }
              interface FJsMacros$ScriptEventListener extends CombineTypes<[_FJsMacros$ScriptEventListener, java.lang.Object, xyz.wagyourtail.jsmacros.core.event.IEventListener]> {}
              interface _FReflection$$static extends ClassLike {
                newInstance0<T>(c: java.lang.Class<T>, objects: any[]): T;
                newInstance0<T>(c: java.lang.Class<T>, ...objects: any[]): T;
                _JAVA_CLASS_CACHE: java.util.Map<string,java.util.List<java.lang.Class<any>>>;
                readonly classLoader: FReflection$CombinedVariableClassLoader;
                new(context: core.language.BaseScriptContext<any>): FReflection;
              }
              let FReflection: _FReflection$$static;
              interface _FReflection {
                compileJavaClass(className: string, code: string): java.lang.Class<any>;
                createClassBuilder<T>(cName: string, clazz: java.lang.Class<T>, interfaces: java.lang.Class<any>[]): impl.classes.ClassBuilder<T>;
                createClassBuilder<T>(cName: string, clazz: java.lang.Class<T>, ...interfaces: java.lang.Class<any>[]): impl.classes.ClassBuilder<T>;
                createClassProxyBuilder<T>(clazz: java.lang.Class<T>, interfaces: java.lang.Class<any>[]): impl.classes.ProxyBuilder<T>;
                createClassProxyBuilder<T>(clazz: java.lang.Class<T>, ...interfaces: java.lang.Class<any>[]): impl.classes.ProxyBuilder<T>;
                createLibrary(className: string, javaCode: string): void;
                createLibraryBuilder(name: string, perExec: boolean, acceptedLangs: string[]): impl.classes.LibraryBuilder;
                createLibraryBuilder(name: string, perExec: boolean, ...acceptedLangs: string[]): impl.classes.LibraryBuilder;
                getAllCompiledJavaClassVersions(className: string): java.util.List<java.lang.Class<any>>;
                getClass<T>(name: string): java.lang.Class<T>;
                getClass<T>(name: string, name2: string): java.lang.Class<T>;
                getClassFromClassBuilderResult(cName: string): java.lang.Class<any>;
                getClassName(o: any): string;
                getCompiledJavaClass(className: string): java.lang.Class<any>;
                getDeclaredField(c: java.lang.Class<any>, name: string): java.lang.reflect.Field;
                getDeclaredField(c: java.lang.Class<any>, name: string, name2: string): java.lang.reflect.Field;
                getDeclaredMethod(c: java.lang.Class<any>, name: string, parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getDeclaredMethod(c: java.lang.Class<any>, name: string, ...parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getDeclaredMethod(c: java.lang.Class<any>, name: string, name2: string, parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getDeclaredMethod(c: java.lang.Class<any>, name: string, name2: string, ...parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getField(c: java.lang.Class<any>, name: string): java.lang.reflect.Field;
                getField(c: java.lang.Class<any>, name: string, name2: string): java.lang.reflect.Field;
                getMethod(c: java.lang.Class<any>, name: string, name2: string, parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getMethod(c: java.lang.Class<any>, name: string, name2: string, ...parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getMethod(c: java.lang.Class<any>, name: string, parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getMethod(c: java.lang.Class<any>, name: string, ...parameterTypes: java.lang.Class<any>[]): java.lang.reflect.Method;
                getReflect(obj: any): org.joor.Reflect;
                invokeMethod(m: java.lang.reflect.Method, c: any, objects: any[]): any;
                invokeMethod(m: java.lang.reflect.Method, c: any, ...objects: any[]): any;
                loadJarFile(file: string): boolean;
                newInstance<T>(c: java.lang.Class<T>, objects: any[]): T;
                newInstance<T>(c: java.lang.Class<T>, ...objects: any[]): T;
              }
              interface FReflection extends CombineTypes<[_FReflection, xyz.wagyourtail.jsmacros.core.library.PerExecLibrary]> {}
              interface _FReflection$CombinedVariableClassLoader$$static extends ClassLike {
                new(parent: java.lang.ClassLoader): FReflection$CombinedVariableClassLoader;
              }
              let FReflection$CombinedVariableClassLoader: _FReflection$CombinedVariableClassLoader$$static;
              interface _FReflection$CombinedVariableClassLoader {
                addClassLoader(jarPath: java.io.File, loader: java.lang.ClassLoader): boolean;
                _findClass(name: string): java.lang.Class<any>;
                _findResource(name: string): java.net.URL;
                _findResources(name: string): java.util.Enumeration<java.net.URL>;
                hasJar(path: java.io.File): boolean;
                _loadResource(url: java.net.URL): java.nio.ByteBuffer;
                _siblingDelegates: java.util.Map<java.io.File,java.lang.ClassLoader>;
              }
              interface FReflection$CombinedVariableClassLoader extends CombineTypes<[_FReflection$CombinedVariableClassLoader, java.lang.ClassLoader]> {}
              interface _FRequest$$static extends ClassLike {
                new(runner: Core<any,any>): FRequest;
              }
              let FRequest: _FRequest$$static;
              interface _FRequest {
                create(url: string): impl.classes.HTTPRequest;
                createWS(url: string): impl.classes.Websocket;
                createWS2(url: string): impl.classes.Websocket;
                get(url: string): impl.classes.HTTPRequest$Response;
                get(url: string, headers: java.util.Map<string,string>): impl.classes.HTTPRequest$Response;
                post(url: string, data: string): impl.classes.HTTPRequest$Response;
                post(url: string, data: string, headers: java.util.Map<string,string>): impl.classes.HTTPRequest$Response;
              }
              interface FRequest extends CombineTypes<[_FRequest, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
              interface _FTime$$static extends ClassLike {
                new(context: core.language.BaseScriptContext<any>): FTime;
              }
              let FTime: _FTime$$static;
              interface _FTime {
                sleep(millis: long): void;
                time(): long;
              }
              interface FTime extends CombineTypes<[_FTime, xyz.wagyourtail.jsmacros.core.library.PerExecLibrary]> {}
            }
            interface _BaseLibrary$$static extends ClassLike {
              new(runner: Core<any,any>): BaseLibrary;
            }
            let BaseLibrary: _BaseLibrary$$static;
            interface _BaseLibrary {
              runner: Core<any,any>;
            }
            interface BaseLibrary extends CombineTypes<[_BaseLibrary, java.lang.Object]> {}
            interface _IFWrapper$$static<T> extends ClassLike {
            }
            let IFWrapper: _IFWrapper$$static<T>;
            interface _IFWrapper<T> {
              deferCurrentTask(): void;
              deferCurrentTask(priorityAdjust: int): void;
              getCurrentPriority(): int;
              methodToJava<A, B, R>(a0: T): MethodWrapper<A,B,R,any>;
              methodToJavaAsync<A, B, R>(a0: T): MethodWrapper<A,B,R,any>;
              methodToJavaAsync<A, B, R>(priority: int, c: T): MethodWrapper<A,B,R,any>;
              stop(): void;
            }
            interface IFWrapper<T> extends CombineTypes<[_IFWrapper<T>, java.lang.Object]> {}
            interface _Library$$static extends ClassLike {
            }
            let Library: _Library$$static;
            interface _Library {
              languages(): java.lang.Class<core.language.BaseLanguage<any,any>>[];
              value(): string;
            }
            interface Library extends CombineTypes<[_Library, java.lang.annotation.Annotation, java.lang.Object]> {}
            interface _LibraryRegistry$$static extends ClassLike {
              new(runner: Core<any,any>): LibraryRegistry;
            }
            let LibraryRegistry: _LibraryRegistry$$static;
            interface _LibraryRegistry {
              addLibrary(clazz: java.lang.Class<BaseLibrary>): void;
              getLibraries(language: core.language.BaseLanguage<any,any>, context: core.language.BaseScriptContext<any>): java.util.Map<string,BaseLibrary>;
              getOnceLibraries(language: core.language.BaseLanguage<any,any>): java.util.Map<string,BaseLibrary>;
              getPerExecLibraries(language: core.language.BaseLanguage<any,any>, context: core.language.BaseScriptContext<any>): java.util.Map<string,BaseLibrary>;
              readonly libraries: java.util.Map<Library,BaseLibrary>;
              readonly perExec: java.util.Map<Library,java.lang.Class<PerExecLibrary>>;
              readonly perExecLanguage: java.util.Map<java.lang.Class<core.language.BaseLanguage<any,any>>,java.util.Map<Library,java.lang.Class<PerExecLanguageLibrary<any,any>>>>;
              readonly perLanguage: java.util.Map<java.lang.Class<core.language.BaseLanguage<any,any>>,java.util.Map<Library,PerLanguageLibrary>>;
              _runner: Core<any,any>;
            }
            interface LibraryRegistry extends CombineTypes<[_LibraryRegistry, java.lang.Object]> {}
            interface _PerExecLanguageLibrary$$static<U,T> extends ClassLike {
              new(context: T, language: java.lang.Class<core.language.BaseLanguage<U,T>>): PerExecLanguageLibrary<U,T>;
            }
            let PerExecLanguageLibrary: _PerExecLanguageLibrary$$static<U,T>;
            interface _PerExecLanguageLibrary<U,T> {
              _ctx: T;
              _language: java.lang.Class<core.language.BaseLanguage<U,T>>;
            }
            interface PerExecLanguageLibrary<U,T> extends CombineTypes<[_PerExecLanguageLibrary<U,T>, BaseLibrary]> {}
            interface _PerExecLibrary$$static extends ClassLike {
              new(context: core.language.BaseScriptContext<any>): PerExecLibrary;
            }
            let PerExecLibrary: _PerExecLibrary$$static;
            interface _PerExecLibrary {
              _ctx: core.language.BaseScriptContext<any>;
            }
            interface PerExecLibrary extends CombineTypes<[_PerExecLibrary, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
            interface _PerLanguageLibrary$$static extends ClassLike {
              new(runner: Core<any,any>, language: java.lang.Class<core.language.BaseLanguage<any,any>>): PerLanguageLibrary;
            }
            let PerLanguageLibrary: _PerLanguageLibrary$$static;
            interface _PerLanguageLibrary {
              _language: java.lang.Class<core.language.BaseLanguage<any,any>>;
            }
            interface PerLanguageLibrary extends CombineTypes<[_PerLanguageLibrary, xyz.wagyourtail.jsmacros.core.library.BaseLibrary]> {}
          }
          module service {
            interface _EventService$$static extends ClassLike {
              new(runner: Core<any,any>, name: string): EventService;
            }
            let EventService: _EventService$$static;
            interface _EventService {
              decrementAndGetInt(name: string): int;
              getAndDecrementInt(name: string): int;
              getAndIncrementInt(name: string): int;
              getBoolean(name: string): boolean;
              getDouble(name: string): double;
              getInt(name: string): int;
              getObject(name: string): any;
              getRaw(): java.util.Map<string,any>;
              getString(name: string): string;
              getType(name: string): string;
              incrementAndGetInt(name: string): int;
              putBoolean(name: string, b: boolean): boolean;
              putDouble(name: string, d: double): double;
              putInt(name: string, i: int): int;
              putObject(name: string, o: any): any;
              putString(name: string, str: string): string;
              remove(key: string): void;
              toString(): string;
              toggleBoolean(name: string): boolean;
              unregisterOnStop(offEvents: boolean, list: core.classes.Registrable<any>[]): void;
              unregisterOnStop(offEvents: boolean, ...list: core.classes.Registrable<any>[]): void;
              _args: java.util.Map<string,any>;
              _ctx: core.language.BaseScriptContext<any>;
              _offEventsOnStop: boolean;
              postStopListener: MethodWrapper<any,any,any,any>;
              _registrableList: core.classes.Registrable<any>[];
              readonly serviceName: string;
              stopListener: MethodWrapper<any,any,any,any>;
            }
            interface EventService extends CombineTypes<[_EventService, xyz.wagyourtail.jsmacros.core.event.BaseEvent]> {}
            interface _ServiceManager$$static extends ClassLike {
              hasKeepAlive(ctx: core.language.BaseScriptContext<any>): boolean;
              setAutoUnregisterKeepAlive(ctx: core.language.BaseScriptContext<any>, keepAlive: boolean): void;
              _autoUnregisterKeepAlive: java.util.Set<any>;
              new(runner: Core<any,any>): ServiceManager;
            }
            let ServiceManager: _ServiceManager$$static;
            interface _ServiceManager {
              disableReload(serviceName: string): void;
              disableService(name: string): ServiceManager$ServiceStatus;
              enableService(name: string): ServiceManager$ServiceStatus;
              getServiceData(name: string): EventService;
              getServices(): java.util.Set<string>;
              getTrigger(name: string): ServiceTrigger;
              isCrashed(serviceName: string): boolean;
              isEnabled(name: string): boolean;
              isRunning(name: string): boolean;
              load(): void;
              markCrashed(serviceName: string): void;
              registerService(name: string, pathToFile: string): boolean;
              registerService(name: string, pathToFile: string, enabled: boolean): boolean;
              registerService(name: string, trigger: ServiceTrigger): boolean;
              renameService(oldName: string, newName: string): boolean;
              restartService(name: string): ServiceManager$ServiceStatus;
              save(): void;
              startReloadListener(): void;
              startService(name: string): ServiceManager$ServiceStatus;
              status(name: string): ServiceManager$ServiceStatus;
              stopReloadListener(): void;
              stopService(name: string): ServiceManager$ServiceStatus;
              tickReloadListener(): void;
              unregisterService(name: string): boolean;
              _crashedServices: java.util.Set<string>;
              _lastModifiedMap: it.unimi.dsi.fastutil.objects.Object2LongMap<string>;
              _registeredServices: java.util.Map<string,Pair<ServiceTrigger,core.language.EventContainer<any>>>;
              _reloadOnModify: boolean;
              _runner: Core<any,any>;
            }
            interface ServiceManager extends CombineTypes<[_ServiceManager, java.lang.Object]> {}
            interface _ServiceManager$ServiceStatus$$static extends ClassLike {
              valueOf(name: string): ServiceManager$ServiceStatus;
              values(): ServiceManager$ServiceStatus[];
              readonly DISABLED: ServiceManager$ServiceStatus;
              readonly ENABLED: ServiceManager$ServiceStatus;
              readonly RUNNING: ServiceManager$ServiceStatus;
              readonly STOPPED: ServiceManager$ServiceStatus;
              readonly UNKNOWN: ServiceManager$ServiceStatus;
            }
            let ServiceManager$ServiceStatus: _ServiceManager$ServiceStatus$$static;
            interface _ServiceManager$ServiceStatus {
            }
            interface ServiceManager$ServiceStatus extends CombineTypes<[_ServiceManager$ServiceStatus]> {}
            interface _ServiceTrigger$$static extends ClassLike {
              new(file: java.nio.file.Path, enabled: boolean): ServiceTrigger;
            }
            let ServiceTrigger: _ServiceTrigger$$static;
            interface _ServiceTrigger {
              equals(o: any): boolean;
              hashCode(): int;
              toScriptTrigger(): core.config.ScriptTrigger;
              enabled: boolean;
              file: java.nio.file.Path;
            }
            interface ServiceTrigger extends CombineTypes<[_ServiceTrigger, java.lang.Object]> {}
          }
          module threads {
            interface _JsMacrosThreadPool$$static extends ClassLike {
              new(): JsMacrosThreadPool;
              new(maxFreeThreads: int): JsMacrosThreadPool;
            }
            let JsMacrosThreadPool: _JsMacrosThreadPool$$static;
            interface _JsMacrosThreadPool {
              runTask(task: java.lang.Runnable): java.lang.Thread;
              runTask(task: java.lang.Runnable, beforeRunTask: java.util.function.Consumer<java.lang.Thread>): java.lang.Thread;
              _freeThreads: java.util.ArrayDeque<JsMacrosThreadPool$PoolThread>;
              readonly maxFreeThreads: int;
            }
            interface JsMacrosThreadPool extends CombineTypes<[_JsMacrosThreadPool, java.lang.Object]> {}
            interface _JsMacrosThreadPool$PoolThread$$static extends ClassLike {
              new(): JsMacrosThreadPool$PoolThread;
            }
            let JsMacrosThreadPool$PoolThread: _JsMacrosThreadPool$PoolThread$$static;
            interface _JsMacrosThreadPool$PoolThread {
              run(): void;
              runTask(task: java.lang.Runnable): void;
              _task: java.lang.Runnable;
            }
            interface JsMacrosThreadPool$PoolThread extends CombineTypes<[_JsMacrosThreadPool$PoolThread, java.lang.Thread]> {}
          }
          interface _Core$$static<T,U> extends ClassLike {
            _lookup: java.lang.invoke.MethodHandles$Lookup;
            new(eventRegistryFunction: java.util.function.Function<Core<T,U>,U>, profileFunction: java.util.function.BiFunction<Core<T,U>,org.slf4j.Logger,T>, configFolder: java.io.File, macroFolder: java.io.File, logger: org.slf4j.Logger): Core<T,U>;
          }
          let Core: _Core$$static<T,U>;
          interface _Core<T,U> {
            addContext(container: core.language.EventContainer<any>): void;
            exec(macro: core.config.ScriptTrigger, event: core.event.BaseEvent): core.language.EventContainer<any>;
            exec(macro: core.config.ScriptTrigger, event: core.event.BaseEvent, then: java.lang.Runnable, catcher: java.util.function.Consumer<java.lang.Throwable>): core.language.EventContainer<any>;
            exec(lang: string, script: string, fakeFile: java.io.File, event: core.event.BaseEvent, then: java.lang.Runnable, catcher: java.util.function.Consumer<java.lang.Throwable>): core.language.EventContainer<any>;
            getContexts(): java.util.Set<core.language.BaseScriptContext<any>>;
            registerHelper<E, R>(type: java.lang.Class<E>, wrapper: java.lang.Class<R>): void;
            wrapException(ex: java.lang.Throwable): core.language.BaseWrappedException<any>;
            _wrapHostInternal(e: java.lang.StackTraceElement, elements: java.util.Iterator<java.lang.StackTraceElement>): core.language.BaseWrappedException<java.lang.StackTraceElement>;
            readonly config: config.ConfigManager;
            _contexts: java.util.Set<language.BaseScriptContext<any>>;
            readonly eventRegistry: event.BaseEventRegistry;
            readonly extensions: extensions.ExtensionLoader;
            readonly helperRegistry: helper.ClassWrapperTree<any,helpers.BaseHelper<any>>;
            readonly libraryRegistry: library.LibraryRegistry;
            readonly profile: T;
            readonly services: service.ServiceManager;
            readonly threadPool: threads.JsMacrosThreadPool;
          }
          interface Core<T,U> extends CombineTypes<[_Core<T,U>, java.lang.Object]> {}
          interface _EventLockWatchdog$$static extends ClassLike {
            startWatchdog(lock: core.language.EventContainer<any>, listener: core.event.IEventListener, maxTime: long): void;
            new(): EventLockWatchdog;
          }
          let EventLockWatchdog: _EventLockWatchdog$$static;
          interface _EventLockWatchdog {
          }
          interface EventLockWatchdog extends CombineTypes<[_EventLockWatchdog, java.lang.Object]> {}
          interface _EventLockWatchdog$WatchdogException$$static extends ClassLike {
            new(message: string): EventLockWatchdog$WatchdogException;
          }
          let EventLockWatchdog$WatchdogException: _EventLockWatchdog$WatchdogException$$static;
          interface _EventLockWatchdog$WatchdogException {
          }
          interface EventLockWatchdog$WatchdogException extends CombineTypes<[_EventLockWatchdog$WatchdogException, java.lang.RuntimeException]> {}
          interface _MethodWrapper$$static<T,U,R,C> extends ClassLike {
            _new(): MethodWrapper<T,U,R,C>;
            new(containingContext: C): MethodWrapper<T,U,R,C>;
          }
          let MethodWrapper: _MethodWrapper$$static<T,U,R,C>;
          interface _MethodWrapper<T,U,R,C> {
            accept(a0: T): void;
            accept(a0: T, a1: U): void;
            andThen<V>(after: java.util.function.Function<R,V>): MethodWrapper<T,U,V,C>;
            andThen(a0: java.util.function.Function): java.util.function.Function;
            andThen(a0: java.util.function.Function): java.util.function.BiFunction;
            apply(a0: T): R;
            apply(a0: T, a1: U): R;
            getCtx(): C;
            negate(): MethodWrapper<T,U,R,C>;
            negate(): java.util.function.Predicate;
            negate(): java.util.function.BiPredicate;
            overrideThread(): java.lang.Thread;
            preventSameScriptJoin(): boolean;
            test(a0: T): boolean;
            test(a0: T, a1: U): boolean;
            _ctx: C;
            _syncObject: any;
          }
          interface MethodWrapper<T,U,R,C> extends CombineTypes<[_MethodWrapper<T,U,R,C>, java.util.function.Function<T,R>, java.util.Comparator<T>, java.util.function.BiPredicate<T,U>, java.util.function.Consumer<T>, java.util.function.BiConsumer<T,U>, java.util.function.Predicate<T>, java.lang.Object, java.lang.Runnable, java.util.function.BiFunction<T,U,R>, java.util.function.Supplier<R>]> {}
          interface _MethodWrapper$AndThenMethodWrapper$$static<T,U,R,V,C> extends ClassLike {
            _new(self: MethodWrapper<T,U,R,C>, after: java.util.function.Function<R,V>): MethodWrapper$AndThenMethodWrapper<T,U,R,V,C>;
          }
          let MethodWrapper$AndThenMethodWrapper: _MethodWrapper$AndThenMethodWrapper$$static<T,U,R,V,C>;
          interface _MethodWrapper$AndThenMethodWrapper<T,U,R,V,C> {
            accept(t: T): void;
            accept(t: T, u: U): void;
            andThen(a0: java.util.function.Function): java.util.function.Function;
            andThen(a0: java.util.function.Function): java.util.function.BiFunction;
            apply(t: T): V;
            apply(t: T, u: U): V;
            compare(o1: T, o2: T): int;
            get(): V;
            negate(): java.util.function.Predicate;
            negate(): java.util.function.BiPredicate;
            preventSameScriptJoin(): boolean;
            run(): void;
            test(t: T): boolean;
            test(arg0: T, arg1: U): boolean;
            _after: java.util.function.Function<R,V>;
            _self: MethodWrapper<T,U,R,C>;
          }
          interface MethodWrapper$AndThenMethodWrapper<T,U,R,V,C> extends CombineTypes<[_MethodWrapper$AndThenMethodWrapper<T,U,R,V,C>, MethodWrapper<T,U,V,C>]> {}
          interface _MethodWrapper$NegateMethodWrapper$$static<T,U,R,C> extends ClassLike {
            _new(self: MethodWrapper<T,U,R,C>): MethodWrapper$NegateMethodWrapper<T,U,R,C>;
          }
          let MethodWrapper$NegateMethodWrapper: _MethodWrapper$NegateMethodWrapper$$static<T,U,R,C>;
          interface _MethodWrapper$NegateMethodWrapper<T,U,R,C> {
            accept(t: T): void;
            accept(t: T, u: U): void;
            andThen(a0: java.util.function.Function): java.util.function.Function;
            andThen(a0: java.util.function.Function): java.util.function.BiFunction;
            apply(t: T): R;
            apply(t: T, u: U): R;
            compare(o1: T, o2: T): int;
            get(): R;
            negate(): java.util.function.Predicate;
            negate(): java.util.function.BiPredicate;
            preventSameScriptJoin(): boolean;
            run(): void;
            test(t: T): boolean;
            test(t: T, u: U): boolean;
            _self: MethodWrapper<T,U,R,C>;
          }
          interface MethodWrapper$NegateMethodWrapper<T,U,R,C> extends CombineTypes<[_MethodWrapper$NegateMethodWrapper<T,U,R,C>, MethodWrapper<T,U,R,C>]> {}
        }
        module fabric {
          module client {
            module api {
              module classes {
                interface _CommandBuilderFabric$$static extends ClassLike {
                  registerEvent(): void;
                  _commands: java.util.Map<string,java.util.function.Function<net.minecraft.class_7157,com.mojang.brigadier.builder.ArgumentBuilder<net.fabricmc.fabric.api.client.command.v2.FabricClientCommandSource,any>>>;
                  new(name: string): CommandBuilderFabric;
                }
                let CommandBuilderFabric: _CommandBuilderFabric$$static;
                interface _CommandBuilderFabric {
                  _argument(name: string, type: java.util.function.Supplier<com.mojang.brigadier.arguments.ArgumentType<any>>): void;
                  _argument(name: string, type: java.util.function.Function<net.minecraft.class_7157,com.mojang.brigadier.arguments.ArgumentType<any>>): void;
                  executes(callback: jsmacros.core.MethodWrapper<jsmacros.client.api.helper.CommandContextHelper,any,any,any>): jsmacros.client.api.classes.inventory.CommandBuilder;
                  literalArg(name: string): jsmacros.client.api.classes.inventory.CommandBuilder;
                  or(): jsmacros.client.api.classes.inventory.CommandBuilder;
                  or(argLevel: int): jsmacros.client.api.classes.inventory.CommandBuilder;
                  register(): jsmacros.client.api.classes.inventory.CommandBuilder;
                  register(): any;
                  _suggests<S>(suggestionProvider: com.mojang.brigadier.suggestion.SuggestionProvider<S>): void;
                  unregister(): jsmacros.client.api.classes.inventory.CommandBuilder;
                  unregister(): any;
                  _name: string;
                  _pointer: java.util.Stack<Pair<boolean,java.util.function.Function<net.minecraft.class_7157,com.mojang.brigadier.builder.ArgumentBuilder<net.fabricmc.fabric.api.client.command.v2.FabricClientCommandSource,any>>>>;
                }
                interface CommandBuilderFabric extends CombineTypes<[_CommandBuilderFabric, xyz.wagyourtail.jsmacros.client.api.classes.inventory.CommandBuilder]> {}
                interface _CommandManagerFabric$$static extends ClassLike {
                  new(): CommandManagerFabric;
                }
                let CommandManagerFabric: _CommandManagerFabric$$static;
                interface _CommandManagerFabric {
                  createCommandBuilder(name: string): jsmacros.client.api.classes.inventory.CommandBuilder;
                  reRegisterCommand(node: jsmacros.client.api.helper.CommandNodeHelper): void;
                  unregisterCommand(command: string): jsmacros.client.api.helper.CommandNodeHelper;
                }
                interface CommandManagerFabric extends CombineTypes<[_CommandManagerFabric, xyz.wagyourtail.jsmacros.client.api.classes.inventory.CommandManager]> {}
                interface _FabricModContainer$$static extends ClassLike {
                  new(base: net.fabricmc.loader.api.ModContainer): FabricModContainer;
                }
                let FabricModContainer: _FabricModContainer$$static;
                interface _FabricModContainer {
                  getAuthors(): java.util.List<string>;
                  getDependencies(): java.util.List<string>;
                  getDescription(): string;
                  getEnv(): string;
                  getId(): string;
                  getName(): string;
                  getVersion(): string;
                  _metadata: net.fabricmc.loader.api.metadata.ModMetadata;
                }
                interface FabricModContainer extends CombineTypes<[_FabricModContainer, jsmacros.api.helper.ModContainerHelper<net.fabricmc.loader.api.ModContainer>]> {}
              }
            }
            module mixins {
              module access {
                interface _MixinDebugHud$$static extends ClassLike {
                  _new(): MixinDebugHud;
                }
                let MixinDebugHud: _MixinDebugHud$$static;
                interface _MixinDebugHud {
                  _afterDrawLeftText(context: net.minecraft.class_332, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                }
                interface MixinDebugHud extends CombineTypes<[_MixinDebugHud, java.lang.Object]> {}
                interface _MixinGameRenderer$$static extends ClassLike {
                  new(): MixinGameRenderer;
                }
                let MixinGameRenderer: _MixinGameRenderer$$static;
                interface _MixinGameRenderer {
                  _onRender(instance: net.minecraft.class_437, drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
                  onTargetUpdate(tickDelta: float, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                  _field_4015: net.minecraft.class_310;
                }
                interface MixinGameRenderer extends CombineTypes<[_MixinGameRenderer, java.lang.Object]> {}
                interface _MixinKeyboard$$static extends ClassLike {
                  new(): MixinKeyboard;
                }
                let MixinKeyboard: _MixinKeyboard$$static;
                interface _MixinKeyboard {
                  _onCharTyped1(instance: net.minecraft.class_437, c: char, i: int, original: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                  _onKeyPressed(instance: net.minecraft.class_437, keyCode: int, scanCode: int, modifiers: int, original: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                }
                interface MixinKeyboard extends CombineTypes<[_MixinKeyboard, java.lang.Object]> {}
                interface _MixinMouse$$static extends ClassLike {
                  new(): MixinMouse;
                }
                let MixinMouse: _MixinMouse$$static;
                interface _MixinMouse {
                  _onMouseClicked(instance: net.minecraft.class_437, x: double, a2: double, y: int, a4: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                  _onMouseDragged(instance: net.minecraft.class_437, x: double, a2: double, y: int, a4: double, button: double, dx: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                  _onMouseReleased(instance: net.minecraft.class_437, x: double, a2: double, y: int, a4: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                  _onMouseScrolled(instance: net.minecraft.class_437, x: double, a2: double, y: double, a4: double, dx: com.llamalad7.mixinextras.injector.wrapoperation.Operation<boolean>): boolean;
                }
                interface MixinMouse extends CombineTypes<[_MixinMouse, java.lang.Object]> {}
                interface _MixinWorldRenderer$$static extends ClassLike {
                  new(): MixinWorldRenderer;
                }
                let MixinWorldRenderer: _MixinWorldRenderer$$static;
                interface _MixinWorldRenderer {
                  _onRenderMain(frameGraphBuilder: net.minecraft.class_9909, frustum: net.minecraft.class_4604, camera: net.minecraft.class_4184, positionMatrix: org.joml.Matrix4f, fog: com.mojang.blaze3d.buffers.GpuBufferSlice, renderBlockOutline: boolean, renderEntityOutlines: boolean, renderTickCounter: net.minecraft.class_9779, profiler: net.minecraft.class_3695, ci: org.spongepowered.asm.mixin.injection.callback.CallbackInfo): void;
                  _field_20951: net.minecraft.class_4599;
                  _field_53081: net.minecraft.class_9960;
                }
                interface MixinWorldRenderer extends CombineTypes<[_MixinWorldRenderer, java.lang.Object]> {}
              }
            }
            interface _ConfigFolderImpl$$static extends ClassLike {
              new(): ConfigFolderImpl;
            }
            let ConfigFolderImpl: _ConfigFolderImpl$$static;
            interface _ConfigFolderImpl {
              getFolder(): java.io.File;
            }
            interface ConfigFolderImpl extends CombineTypes<[_ConfigFolderImpl, xyz.wagyourtail.jsmacros.client.ConfigFolder, java.lang.Object]> {}
            interface _JsMacrosFabric$$static extends ClassLike {
              new(): JsMacrosFabric;
            }
            let JsMacrosFabric: _JsMacrosFabric$$static;
            interface _JsMacrosFabric {
              onInitialize(): void;
              onInitializeClient(): void;
            }
            interface JsMacrosFabric extends CombineTypes<[_JsMacrosFabric, net.fabricmc.api.ClientModInitializer, java.lang.Object, net.fabricmc.api.ModInitializer]> {}
            interface _ModLoaderImpl$$static extends ClassLike {
              new(): ModLoaderImpl;
            }
            let ModLoaderImpl: _ModLoaderImpl$$static;
            interface _ModLoaderImpl {
              getLoadedMods(): java.util.List<client.api.classes.FabricModContainer>;
              getMod(modId: string): client.api.classes.FabricModContainer;
              getMod(a0: string): jsmacros.api.helper.ModContainerHelper;
              getName(): string;
              isDevEnv(): boolean;
              isModLoaded(modId: string): boolean;
            }
            interface ModLoaderImpl extends CombineTypes<[_ModLoaderImpl, xyz.wagyourtail.jsmacros.client.ModLoader, java.lang.Object]> {}
            interface _ModMenuEntry$$static extends ClassLike {
              new(): ModMenuEntry;
            }
            let ModMenuEntry: _ModMenuEntry$$static;
            interface _ModMenuEntry {
              getModConfigScreenFactory(): com.terraformersmc.modmenu.api.ConfigScreenFactory<any>;
              _jsmacrosscreenfactory: ModMenuEntry$JsMacroScreen;
            }
            interface ModMenuEntry extends CombineTypes<[_ModMenuEntry, com.terraformersmc.modmenu.api.ModMenuApi, java.lang.Object]> {}
            interface _ModMenuEntry$JsMacroScreen$$static extends ClassLike {
              new(): ModMenuEntry$JsMacroScreen;
            }
            let ModMenuEntry$JsMacroScreen: _ModMenuEntry$JsMacroScreen$$static;
            interface _ModMenuEntry$JsMacroScreen {
              create(parent: net.minecraft.class_437): wagyourtail.wagyourgui.BaseScreen;
              create(a0: net.minecraft.class_437): net.minecraft.class_437;
            }
            interface ModMenuEntry$JsMacroScreen extends CombineTypes<[_ModMenuEntry$JsMacroScreen, com.terraformersmc.modmenu.api.ConfigScreenFactory<wagyourtail.wagyourgui.BaseScreen>, java.lang.Object]> {}
          }
        }
        module util {
          interface _NameUtil$$static extends ClassLike {
            _getNameOrDefault(potentialName: NameUtil$charSequence): string;
            _getNameOrDefault(potentialName: NameUtil$charSequence, defaultValue: string): string;
            guessNameAndRoles(text: string): java.util.List<string>;
            _DEFAULT_BUILDER_CAPACITY: int;
            _MAX_STRING_LENGTH: int;
            _PATTERN_NAME: java.util.regex.Pattern;
            _PATTERN_WHISPER: java.util.regex.Pattern;
            _VALID_NAME: string;
          }
          let NameUtil: _NameUtil$$static;
          interface _NameUtil {
          }
          interface NameUtil extends CombineTypes<[_NameUtil, java.lang.Object]> {}
        }
      }
      module wagyourgui {
        module containers {
          interface _CheckBoxContainer$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, defaultState: boolean, message: net.minecraft.class_2561, parent: IContainerParent, setState: java.util.function.Consumer<boolean>): CheckBoxContainer;
          }
          let CheckBoxContainer: _CheckBoxContainer$$static;
          interface _CheckBoxContainer {
            init(): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            setPos(x: int, y: int, width: int, height: int): void;
            _checkBox: wagyourgui.elements.Button;
            message: net.minecraft.class_2561;
            _setState: java.util.function.Consumer<boolean>;
            _state: boolean;
          }
          interface CheckBoxContainer extends CombineTypes<[_CheckBoxContainer, MultiElementContainer<IContainerParent>]> {}
          interface _IContainerParent$$static extends ClassLike {
          }
          let IContainerParent: _IContainerParent$$static;
          interface _IContainerParent {
            getFirstOverlayParent(): wagyourgui.overlays.IOverlayParent;
            method_37063<T>(a0: T): T;
            method_37066(a0: net.minecraft.class_364): void;
            openOverlay(a0: wagyourgui.overlays.OverlayContainer): void;
            openOverlay(a0: wagyourgui.overlays.OverlayContainer, a1: boolean): void;
          }
          interface IContainerParent extends CombineTypes<[_IContainerParent, java.lang.Object]> {}
          interface _ListContainer$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, list: java.util.List<net.minecraft.class_2561>, parent: wagyourgui.overlays.IOverlayParent, onSelect: java.util.function.Consumer<int>): ListContainer;
          }
          let ListContainer: _ListContainer$$static;
          interface _ListContainer {
            addItem(name: net.minecraft.class_2561): void;
            init(): void;
            onScrollbar(page: double): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            setSelected(index: int): void;
            _list: java.util.List<net.minecraft.class_2561>;
            _listItems: java.util.List<wagyourgui.elements.Button>;
            onSelect: java.util.function.Consumer<int>;
            _scroll: wagyourgui.elements.Scrollbar;
            _selected: int;
            _topScroll: int;
          }
          interface ListContainer extends CombineTypes<[_ListContainer, MultiElementContainer<IContainerParent>]> {}
          interface _MultiElementContainer$$static<T> extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: T): MultiElementContainer<T>;
          }
          let MultiElementContainer: _MultiElementContainer$$static<T>;
          interface _MultiElementContainer<T> {
            getButtons(): java.util.List<net.minecraft.class_339>;
            getFirstOverlayParent(): wagyourgui.overlays.IOverlayParent;
            getVisible(): boolean;
            init(): void;
            method_37063<T>(drawableElement: T): T;
            method_37066(button: net.minecraft.class_364): void;
            openOverlay(overlay: wagyourgui.overlays.OverlayContainer): void;
            openOverlay(overlay: wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
            render(a0: net.minecraft.class_332, a1: int, a2: int, a3: float): void;
(a0: net.minecraft.class_332, a1: int, a2: int, a3: float): void;
            setPos(x: int, y: int, width: int, height: int): void;
            setVisible(visible: boolean): void;
            _buttons: java.util.List<net.minecraft.class_339>;
            height: int;
            readonly parent: T;
            _textRenderer: net.minecraft.class_327;
            _visible: boolean;
            width: int;
            x: int;
            y: int;
          }
          interface MultiElementContainer<T> extends CombineTypes<[_MultiElementContainer<T>, IContainerParent, java.lang.Object]> {}
        }
        module elements {
          interface _AnnotatedCheckBox$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, color: int, borderColor: int, highlightColor: int, textColor: int, message: net.minecraft.class_2561, initialValue: boolean, onPress: java.util.function.Consumer<Button>): AnnotatedCheckBox;
          }
          let AnnotatedCheckBox: _AnnotatedCheckBox$$static;
          interface _AnnotatedCheckBox {
            method_25306(): void;
            method_25355(message: net.minecraft.class_2561): void;
            method_48579(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            _renderMessage(drawContext: net.minecraft.class_332): void;
            value: boolean;
          }
          interface AnnotatedCheckBox extends CombineTypes<[_AnnotatedCheckBox, xyz.wagyourtail.wagyourgui.elements.Button]> {}
          interface _Button$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, color: int, borderColor: int, highlightColor: int, textColor: int, message: net.minecraft.class_2561, onPress: java.util.function.Consumer<Button>): Button;
          }
          let Button: _Button$$static;
          interface _Button {
            cantRenderAllText(): boolean;
            method_25306(): void;
            method_25348(mouseX: double, a1: double): void;
            method_25355(message: net.minecraft.class_2561): void;
            method_25357(mouseX: double, a1: double): void;
            _method_47399(builder: net.minecraft.class_6382): void;
            method_48579(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            _renderMessage(drawContext: net.minecraft.class_332): void;
            setBorderColor(color: int): void;
            setColor(color: int): void;
            setHighlightColor(color: int): void;
            _setMessageSuper(message: net.minecraft.class_2561): void;
            setPos(x: int, y: int, width: int, height: int): Button;
            setTextColor(color: int): void;
            _borderColor: int;
            _color: int;
            forceHover: boolean;
            _highlightColor: int;
            horizCenter: boolean;
            hovering: boolean;
            onPress: java.util.function.Consumer<Button>;
            _textColor: int;
            _textLines: java.util.List<net.minecraft.class_5481>;
            _textRenderer: net.minecraft.class_327;
            _verticalCenter: int;
            _visibleLines: int;
          }
          interface Button extends CombineTypes<[_Button, net.minecraft.class_4264]> {}
          interface _Scrollbar$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, color: int, borderColor: int, highlightColor: int, scrollPages: double, a8: java.util.function.Consumer<double>): Scrollbar;
          }
          let Scrollbar: _Scrollbar$$static;
          interface _Scrollbar {
            method_25348(mouseX: double, a1: double): void;
            method_25403(mouseX: double, a1: double, mouseY: int, a3: double, button: double): boolean;
            _method_47399(builder: net.minecraft.class_6382): void;
            method_48579(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            onChange(): void;
            scrollToPercent(percent: double): void;
            setPos(x: int, y: int, width: int, height: int): Scrollbar;
            setScrollPages(scrollPages: double): void;
            _borderColor: int;
            _color: int;
            _highlightColor: int;
            _onChange: java.util.function.Consumer<double>;
            _scrollAmount: double;
            _scrollDistance: double;
            _scrollPages: double;
            _scrollbarHeight: double;
          }
          interface Scrollbar extends CombineTypes<[_Scrollbar, net.minecraft.class_339]> {}
          interface _Slider$$static extends ClassLike {
            _HANDLE_HIGHLIGHTED_TEXTURE: net.minecraft.class_2960;
            _HANDLE_TEXTURE: net.minecraft.class_2960;
            _HIGHLIGHTED_TEXTURE: net.minecraft.class_2960;
            _TEXTURE: net.minecraft.class_2960;
            new(x: int, y: int, width: int, height: int, text: net.minecraft.class_2561, value: double, a6: java.util.function.Consumer<Slider>, action: int): Slider;
            new(x: int, y: int, width: int, height: int, text: net.minecraft.class_2561, value: double, a6: java.util.function.Consumer<Slider>): Slider;
          }
          let Slider: _Slider$$static;
          interface _Slider {
            _applyValue(): void;
            _getHandleTexture(): net.minecraft.class_2960;
            getSteps(): int;
            _getTexture(): net.minecraft.class_2960;
            getValue(): double;
            method_25348(mouseX: double, a1: double): void;
            _method_25349(mouseX: double, a1: double, mouseY: double, a3: double): void;
            method_25355(message: net.minecraft.class_2561): void;
            method_25357(mouseX: double, a1: double): void;
            method_25404(keyCode: int, scanCode: int, modifiers: int): boolean;
            _method_47399(builder: net.minecraft.class_6382): void;
            _method_48579(context: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            roundValue(value: double): double;
            setMessage(message: string): void;
            setSteps(steps: int): void;
            setValue(mouseX: double): void;
            _setValueFromMouse(mouseX: double): void;
            _action: java.util.function.Consumer<Slider>;
            _steps: int;
            _value: double;
          }
          interface Slider extends CombineTypes<[_Slider, net.minecraft.class_339]> {}
          interface _TextInput$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, color: int, borderColor: int, highlightColor: int, textColor: int, message: string, onClick: java.util.function.Consumer<Button>, onChange: java.util.function.Consumer<string>): TextInput;
          }
          let TextInput: _TextInput$$static;
          interface _TextInput {
            method_25400(chr: char, keyCode: int): boolean;
            method_25402(mouseX: double, a1: double, mouseY: int): boolean;
            method_25403(mouseX: double, a1: double, mouseY: int, a3: double, button: double): boolean;
            method_25404(keyCode: int, scanCode: int, modifiers: int): boolean;
            _renderMessage(drawContext: net.minecraft.class_332): void;
            setMessage(message: string): void;
            setSelected(sel: boolean): void;
            swapStartEnd(): void;
            updateSelEnd(endIndex: int): void;
            updateSelStart(startIndex: int): void;
            _arrowCursor: int;
            content: string;
            mask: string;
            onChange: java.util.function.Consumer<string>;
            _selColor: int;
            _selEnd: int;
            selEndIndex: int;
            _selStart: int;
            selStartIndex: int;
          }
          interface TextInput extends CombineTypes<[_TextInput, xyz.wagyourtail.wagyourgui.elements.Button]> {}
        }
        module overlays {
          interface _ConfirmOverlay$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, message: net.minecraft.class_2561, parent: IOverlayParent, accept: java.util.function.Consumer<ConfirmOverlay>): ConfirmOverlay;
            new(x: int, y: int, width: int, height: int, hcenter: boolean, textRenderer: net.minecraft.class_327, message: net.minecraft.class_2561, parent: IOverlayParent, accept: java.util.function.Consumer<ConfirmOverlay>): ConfirmOverlay;
          }
          let ConfirmOverlay: _ConfirmOverlay$$static;
          interface _ConfirmOverlay {
            init(): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            _renderMessage(drawContext: net.minecraft.class_332): void;
            setMessage(message: net.minecraft.class_2561): void;
            _accept: java.util.function.Consumer<ConfirmOverlay>;
            hcenter: boolean;
            _lines: int;
            _text: java.util.List<net.minecraft.class_5481>;
            _vcenter: int;
          }
          interface ConfirmOverlay extends CombineTypes<[_ConfirmOverlay, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
          interface _IOverlayParent$$static extends ClassLike {
          }
          let IOverlayParent: _IOverlayParent$$static;
          interface _IOverlayParent {
            closeOverlay(a0: OverlayContainer): void;
            getChildOverlay(): OverlayContainer;
            method_25395(a0: net.minecraft.class_364): void;
          }
          interface IOverlayParent extends CombineTypes<[_IOverlayParent, xyz.wagyourtail.wagyourgui.containers.IContainerParent, java.lang.Object]> {}
          interface _OverlayContainer$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, parent: IOverlayParent): OverlayContainer;
          }
          let OverlayContainer: _OverlayContainer$$static;
          interface _OverlayContainer {
            close(): void;
            closeOverlay(overlay: OverlayContainer): void;
            getChildOverlay(): OverlayContainer;
            getFirstOverlayParent(): IOverlayParent;
            keyPressed(keyCode: int, scanCode: int, modifiers: int): boolean;
            method_25395(focused: net.minecraft.class_364): void;
            method_37066(btn: net.minecraft.class_364): void;
            onClick(mouseX: double, a1: double, mouseY: int): void;
            onClose(): void;
            openOverlay(overlay: OverlayContainer): void;
            openOverlay(overlay: OverlayContainer, disableButtons: boolean): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            renderBackground(drawContext: net.minecraft.class_332): void;
            _overlay: OverlayContainer;
            savedBtnStates: java.util.Map<net.minecraft.class_339,boolean>;
            scroll: wagyourgui.elements.Scrollbar;
          }
          interface OverlayContainer extends CombineTypes<[_OverlayContainer, IOverlayParent, wagyourgui.containers.MultiElementContainer<IOverlayParent>]> {}
          interface _SelectorDropdownOverlay$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, choices: java.util.Collection<net.minecraft.class_2561>, textRenderer: net.minecraft.class_327, parent: IOverlayParent, onChoice: java.util.function.Consumer<int>): SelectorDropdownOverlay;
          }
          let SelectorDropdownOverlay: _SelectorDropdownOverlay$$static;
          interface _SelectorDropdownOverlay {
            init(): void;
            keyPressed(keyCode: int, scanCode: int, modifiers: int): boolean;
            onClick(mouseX: double, a1: double, mouseY: int): void;
            onScroll(page: double): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            setSelected(sel: int): void;
            _choices: java.util.Collection<net.minecraft.class_2561>;
            _lineHeight: int;
            _onChoice: java.util.function.Consumer<int>;
            _pages: double;
            _scrollChoices: java.util.List<wagyourgui.elements.Button>;
            _selected: int;
          }
          interface SelectorDropdownOverlay extends CombineTypes<[_SelectorDropdownOverlay, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
          interface _TextPrompt$$static extends ClassLike {
            new(x: int, y: int, width: int, height: int, textRenderer: net.minecraft.class_327, message: net.minecraft.class_2561, defaultText: string, parent: IOverlayParent, accept: java.util.function.Consumer<string>): TextPrompt;
          }
          let TextPrompt: _TextPrompt$$static;
          interface _TextPrompt {
            init(): void;
            render(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
            _accept: java.util.function.Consumer<string>;
            _defText: string;
            _message: net.minecraft.class_2561;
            ti: wagyourgui.elements.TextInput;
          }
          interface TextPrompt extends CombineTypes<[_TextPrompt, xyz.wagyourtail.wagyourgui.overlays.OverlayContainer]> {}
        }
        interface _BaseScreen$$static extends ClassLike {
          trimmed(textRenderer: net.minecraft.class_327, str: net.minecraft.class_5348, width: int): net.minecraft.class_5481;
          _new(title: net.minecraft.class_2561, parent: net.minecraft.class_437): BaseScreen;
        }
        let BaseScreen: _BaseScreen$$static;
        interface _BaseScreen {
          closeOverlay(overlay: wagyourgui.overlays.OverlayContainer): void;
          getChildOverlay(): wagyourgui.overlays.OverlayContainer;
          getFirstOverlayParent(): wagyourgui.overlays.IOverlayParent;
          method_25394(drawContext: net.minecraft.class_332, mouseX: int, mouseY: int, delta: float): void;
          method_25395(focused: net.minecraft.class_364): void;
          method_25401(mouseX: double, a1: double, mouseY: double, a3: double): boolean;
          method_25402(mouseX: double, a1: double, mouseY: int): boolean;
          method_25404(keyCode: int, scanCode: int, modifiers: int): boolean;
          method_25419(): void;
          method_25422(): boolean;
          _method_25426(): void;
          method_25432(): void;
          method_37063<T>(renderableWidget: T): T;
          method_37066(btn: net.minecraft.class_364): void;
          openOverlay(overlay: wagyourgui.overlays.OverlayContainer): void;
          openOverlay(overlay: wagyourgui.overlays.OverlayContainer, disableButtons: boolean): void;
          openParent(): void;
          reload(): void;
          setParent(parent: net.minecraft.class_437): void;
          updateSettings(): void;
          _overlay: overlays.OverlayContainer;
          _parent: net.minecraft.class_437;
        }
        interface BaseScreen extends CombineTypes<[_BaseScreen, xyz.wagyourtail.wagyourgui.overlays.IOverlayParent, net.minecraft.class_437]> {}
      }
      interface _Pair$$static<T,U> extends ClassLike {
        new(t: T, u: U): Pair<T,U>;
      }
      let Pair: _Pair$$static<T,U>;
      interface _Pair<T,U> {
        getT(): T;
        getU(): U;
        setT(t: T): void;
        setU(u: U): void;
        _t: T;
        _u: U;
      }
      interface Pair<T,U> extends CombineTypes<[_Pair<T,U>, java.lang.Object]> {}
      interface _PrioryFiFoTaskQueue$$static<E> extends ClassLike {
        new(priorityFunction: java.util.function.Function<E,int>): PrioryFiFoTaskQueue<E>;
      }
      let PrioryFiFoTaskQueue: _PrioryFiFoTaskQueue$$static<E>;
      interface _PrioryFiFoTaskQueue<E> {
        add(e: E): boolean;
        addAll(collection: java.util.Collection<E>): boolean;
        clear(): void;
        contains(o: any): boolean;
        containsAll(collection: java.util.Collection<any>): boolean;
        element(): E;
        _getLowestPrioItem(): E;
        isEmpty(): boolean;
        iterator(): java.util.Iterator<E>;
        offer(e: E): boolean;
        peek(): E;
        peekWaiting(): E;
        peekWaiting(timeout: long): E;
        poll(): E;
        pollWaiting(): E;
        pollWaiting(timeout: long): E;
        remove(o: any): boolean;
        remove(): E;
        removeAll(collection: java.util.Collection<any>): boolean;
        retainAll(collection: java.util.Collection<any>): boolean;
        size(): int;
        toArray(): any[];
        toArray<T>(ts: T[]): T[];
        _currentTask: E;
        _priorityFunction: java.util.function.Function<E,int>;
        _taskSet: java.util.Set<E>;
        _tasks: it.unimi.dsi.fastutil.ints.Int2ObjectOpenHashMap<java.util.List<E>>;
      }
      interface PrioryFiFoTaskQueue<E> extends CombineTypes<[_PrioryFiFoTaskQueue<E>, java.util.Queue<E>, java.lang.Object]> {}
      interface _StringHashTrie$$static extends ClassLike {
        new(): StringHashTrie;
      }
      let StringHashTrie: _StringHashTrie$$static;
      interface _StringHashTrie {
        add(s: string): boolean;
        add(a0: any): boolean;
        addAll(c: java.util.Collection<string>): boolean;
        addAll(o: string[]): boolean;
        addAll(...o: string[]): boolean;
        clear(): void;
        contains(o: any): boolean;
        containsAll(c: java.util.Collection<any>): boolean;
        containsAll(o: string[]): boolean;
        containsAll(...o: string[]): boolean;
        getAll(): java.util.Set<string>;
        getAllWithPrefix(prefix: string): java.util.Set<string>;
        getAllWithPrefixCaseInsensitive(prefix: string): java.util.Set<string>;
        isEmpty(): boolean;
        iterator(): java.util.Iterator<string>;
        _jsonChildrenString(): string;
        _jsonLeafString(): string;
        _rekey(newKeyLength: int): void;
        remove(o: any): boolean;
        removeAll(c: java.util.Collection<any>): boolean;
        removeAll(o: string[]): boolean;
        removeAll(...o: string[]): boolean;
        _removeChild(childKey: string): void;
        retainAll(c: java.util.Collection<any>): boolean;
        retainAll(o: string[]): boolean;
        retainAll(...o: string[]): boolean;
        size(): int;
        toArray(): string[];
        toArray<T>(a: T[]): T[];
        toArray(): any[];
        toString(): string;
        _children: java.util.Map<string,StringHashTrie>;
        _key: string;
        _keyLength: int;
        _leafs: java.util.Set<string>;
        _parent: StringHashTrie;
      }
      interface StringHashTrie extends CombineTypes<[_StringHashTrie, java.util.Collection<string>, java.lang.Object]> {}
      interface _SynchronizedWeakHashSet$$static<E> extends ClassLike {
        new(): SynchronizedWeakHashSet<E>;
      }
      let SynchronizedWeakHashSet: _SynchronizedWeakHashSet$$static<E>;
      interface _SynchronizedWeakHashSet<E> {
        add(o: E): boolean;
        clear(): void;
        contains(o: any): boolean;
        iterator(): java.util.Iterator<E>;
        remove(o: any): boolean;
        size(): int;
        _map: java.util.Map<E,boolean>;
      }
      interface SynchronizedWeakHashSet<E> extends CombineTypes<[_SynchronizedWeakHashSet<E>, java.util.AbstractSet<E>, java.io.Serializable]> {}
      interface _Util$$static extends ClassLike {
        tryAutoCastNumber(returnType: java.lang.Class<any>, number: any): any;
        new(): Util;
      }
      let Util: _Util$$static;
      interface _Util {
      }
      interface Util extends CombineTypes<[_Util, java.lang.Object]> {}
    }
  }
}
