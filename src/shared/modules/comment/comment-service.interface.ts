
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  getCommentsByOfferId(offerId: string) : Promise<DocumentType<CommentEntity>[]>
}
