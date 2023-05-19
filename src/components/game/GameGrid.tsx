const GameGrid = () => {
    return(
        <div className="grid">
            <div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src="../src/assets/images/card-front.png" alt="gamecard" />
                        </div>
                        <div className="flip-card-back">
                            <img src="../src/assets/images/cards/card1.svg" alt="gamecard" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src="../src/assets/images/card-front.png" alt="gamecard" />
                        </div>
                        <div className="flip-card-back">
                            <img src="../src/assets/images/cards/card2.svg" alt="gamecard" />
                        </div>
                    </div>
                </div>
            </div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
        </div>
    )
}

export default GameGrid