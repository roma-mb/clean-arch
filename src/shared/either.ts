export type Either<L, R> =
  | { isLeft: true; value: L }
  | { isLeft: false; value: R };

export function left<L, R>(value: L): Either<L, R> {
  return { isLeft: true, value };
}

export function right<L, R>(value: R): Either<L, R> {
  return { isLeft: false, value };
}
