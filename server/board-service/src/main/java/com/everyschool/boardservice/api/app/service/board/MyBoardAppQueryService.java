package com.everyschool.boardservice.api.app.service.board;

import com.everyschool.boardservice.api.app.controller.board.response.BoardResponse;
import com.everyschool.boardservice.api.client.UserServiceClient;
import com.everyschool.boardservice.api.client.response.UserInfo;
import com.everyschool.boardservice.domain.board.repository.MyBoardAppQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class MyBoardAppQueryService {

    private final MyBoardAppQueryRepository myBoardAppQueryRepository;
    private final UserServiceClient userServiceClient;

    public List<BoardResponse> myBoards(String userKey, int category) {
        UserInfo userInfo = userServiceClient.searchUserInfo(userKey);

        return myBoardAppQueryRepository.findMyBoardsByUserId(userInfo.getUserId(), category);
    }

    public List<BoardResponse> myComments(String userKey) {
        UserInfo userInfo = userServiceClient.searchUserInfo(userKey);

        return myBoardAppQueryRepository.findCommentBoardByUserId(userInfo.getUserId());
    }
}
