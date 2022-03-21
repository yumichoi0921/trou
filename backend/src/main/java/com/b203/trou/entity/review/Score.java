package com.b203.trou.entity.review;

public enum Score {
    ONE(1), TWO(2), THREE(3), FOUR(4), FIVE(5);

    public final int value;

    Score(int value) {
        this.value = value;
    }
}
