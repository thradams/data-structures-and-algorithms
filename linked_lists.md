
[Main](README.md) > Linked lists  

# Linked list

## Sample 1 - Singly linked list

```c
struct book {
     char* title;
     struct book* next;
};

void book_destroy(struct book* book) {
     free(book->title);
}
 
struct books {
    struct book* head, *tail;
};

```

[source → ](linked_lists10.md)

## Sample 2 - Double linked list

```c
struct book {
     char* title;
     struct book* next;
     struct book* prev;
};

void book_destroy(struct book* book) {
     free(book->title);
 }
 

struct books {
    struct book* head, *tail;
};

```

[source → ](linked_lists20.md)



