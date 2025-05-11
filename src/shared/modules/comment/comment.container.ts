import { Container } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';
import { Component } from '../../types/index.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.OfferService).to(DefaultCommentService);
  commentContainer.bind<ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
