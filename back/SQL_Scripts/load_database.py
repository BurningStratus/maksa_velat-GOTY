from SQL_Scripts import sql_connection as sql

class Query:
    def __init__(self, qry):
        self.query = qry
        
    def executeSQL(self):
        sql.kursori.execute(self.query)

        if sql.kursori.rowcount == 1:
            print("SQL query successful.")
        else:
            print("0-rowcount from SQL query.")
    
'''
class ExecQuery(Query):
    def __init__(self, qry, fetch_type):
        super().__init__(qry)
        self.fetch_type = fetch_type
'''

def load_events():
    '''Loads events on new game.'''
    ### new version for classes >:(
    # clear_old_players = Query("delete from game;")

    clear_events = Query('''UPDATE airport SET event_id = 0, event_stat = 0;''')
    add_quests = Query('''update airport set event_id=(select id from event where event_name=airport_name)
                    where exists (select 1 from event where event_name=airport_name);''')
    add_bandits = Query('''UPDATE airport 
                        SET event_id = 13
                        WHERE event_id = 0
                        ORDER BY RAND() 
                        LIMIT 5;''')
    add_black_cat = Query('''UPDATE airport 
                        SET event_id=11 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_blown_engine = Query('''UPDATE airport 
                        SET event_id=12
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_fundraiser = Query('''UPDATE airport 
                        SET event_id=14 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_plant_trees = Query('''UPDATE airport 
                        SET event_id=15 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_chess = Query('''UPDATE airport
                        SET event_id = 17
                        WHERE event_id = 0
                        ORDER BY RAND()
                        LIMIT 1;''')
    fill_nulls = Query('''UPDATE AIRPORT
                       SET event_stat = 0
                       WHERE event_stat IS NULL;''')

    init_game = [
        clear_old_players,
        clear_events,
        add_quests,
        add_bandits,
        add_black_cat,
        add_blown_engine,
        add_fundraiser,
        add_plant_trees,
        add_chess,
        fill_nulls]
    
    for qry in init_game:
        qry.executeSQL()

    return 'SQL executed'
    ###
