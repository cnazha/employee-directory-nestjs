import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { escapeRegExp } from '../helpers/escape-regex';

@Injectable()
export class TextEscapePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return escapeRegExp(value);
  }
}
